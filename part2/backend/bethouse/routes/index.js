var
    Administradores = require('../controllers/administradores'),
    Utilizadores    = require('../controllers/utilizadores'),
    Categorias      = require('../controllers/categorias'),
    Resultados      = require('../controllers/resultados'),
    Eventos         = require('../controllers/eventos'),
    Apostas         = require('../controllers/apostas'),
    express         = require('express'),
    router          = express.Router();


// Middleware que verifica se o utilizador tem login no sistema.
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.jsonp(null);
    } else {
        return next();
    }
}

/* Obtém utilizador em sessão. */
router.get('/session', authMiddleware, function(req, res) {
    if (typeof req.session.passport.user != "number") {
        Administradores.getUserByID(req.session.passport.user)
            .then(dados => {
                let user = JSON.parse(JSON.stringify(dados[0]));
                res.jsonp(user);
            })
            .catch(err => res.status(500).send('Erro ao obter utilizador: ' + err));
    } else {
        Utilizadores.getUserByID(req.session.passport.user)
            .then(dados => {
                let user = JSON.parse(JSON.stringify(dados[0]));
                res.jsonp(user);
            })
            .catch(err => res.status(500).send('Erro ao obter utilizador: ' + err));
    }
});


/* Listar toda a informação dos Utilizadores. */
router.get('/utilizadores', authMiddleware, function(req, res, next) {
    if (typeof req.session.passport.user !== "number") {
        Utilizadores.getAllInfo()
            .then(dados => {
                console.log(dados);
                res.jsonp(dados);
            })
            .catch(err => {
                console.log(err);
                res.send('Erro ao obter informação geral dos utilizadores: ' + err);
            })
    }
});

/* Listar Categorias. */
router.get('/categorias', authMiddleware, function(req, res) {
    Categorias.listar()
        .then(dados => {
            console.log(dados);
            res.jsonp(dados);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
});

/* Listar Resultados. */
router.get('/resultados', function(req, res) {
    Resultados.listar()
        .then(dados => {
            console.log(dados);
            res.jsonp(dados);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
});

/* Função Auxiliar - Verificar quais Apostas estão terminadas. */
async function checkFinalApostas() {
    Apostas.checkFinalApostas()
        .catch(err => console.log(err));
}

/* Listar Eventos e informação completa. */
router.get('/eventos', async function(req, res) {
    await Eventos.listar()
        .then(async function(dados) {
            var dadosObj = JSON.parse(JSON.stringify(dados[0]));
            var eventosObj = {};

            for (let i = 0; i < dadosObj.length; i++) {
                var evento = dadosObj[i];
                var idEv   = '' + evento.idEvento;
                var idRes  = '' + evento.idResultado;

                if (eventosObj[idEv]) {
                    eventosObj[idEv]['participantes'][idRes] = evento['ResDesig'];
                    eventosObj[idEv]['odds'][idRes] = evento['Odd'];
                } else {
                    var infoObj = `{
                        "Evento": ${idEv},
                        "Estado": ${evento['Estado']},
                        "DiaHora": "${evento['DiaHora']}",
                        "idCategoria": ${evento['idCategoria']},
                        "Categoria": "${evento['CatDesig']}",
                        "participantes": { "${idRes}": "${evento['ResDesig']}" },
                        "odds": { "${idRes}": ${evento['Odd']} }
                    }`;

                    eventosObj[idEv] = JSON.parse(infoObj);
                }
            }

            var eventos_filtered = {};

            /* Filtrar eventos por data. */
            for (const key in eventosObj) {
                var idEvento = key;
                var fechar_evento = false;

                let datetime = eventosObj[idEvento]['DiaHora'].split('T');

                /* Processar data de fecho do evento. */
                const date   = datetime[0]
                    .split('-')
                    .map(numStr => { return parseInt(numStr) });
                const time   = datetime[1]
                    .split('.')[0]
                    .split(':')
                    .map(numStr => { return parseInt(numStr) });

                /* Processar data neste instante de tempo. */
                var now = new Date();
                var now_date = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
                var now_time = [now.getHours(), now.getMinutes(), now.getMinutes()];


                /* Comparar datas. */

                // Se ANOS forem iguais.
                if (date[0] == now_date[0]) {
                    // Se MÊSES forem iguais.
                    if (date[1] == now_date[1]) {
                        // Se DIAS forem iguais.
                        if (date[2] == now_date[2]) {
                            // Se HORAS forem iguais.
                            if (time[0] == now_time[0]) {
                                // Se MINUTOS forem iguais.
                                if (time[1] == now_time[1]) {
                                    // Se SEGUNDOS do evento forem maiores que do presente.
                                    if (time[2] > now_time[2]) {
                                        // Evento ainda é válido!
                                        eventos_filtered[idEvento] = eventosObj[idEvento];
                                    } else {
                                        fechar_evento = true;
                                    }
                                } else if (time[1] > now_time[1]) {
                                    // Evento ainda é válido!
                                    eventos_filtered[idEvento] = eventosObj[idEvento];
                                } else {
                                    fechar_evento = true;
                                }
                            } else if (time[0] > now_time[0]) {
                                // Evento ainda é válido!
                                eventos_filtered[idEvento] = eventosObj[idEvento];
                            } else {
                                fechar_evento = true;
                            }
                        } else if (date[2] > now_date[2]) {
                            // Evento ainda é válido!
                            eventos_filtered[idEvento] = eventosObj[idEvento];
                        } else {
                            fechar_evento = true;
                        }
                    } else if (date[1] > now_date[1]) {
                        // Evento ainda é válido!
                        eventos_filtered[idEvento] = eventosObj[idEvento];
                    } else {
                        fechar_evento = true;
                    }
                } else if (date[0] > now_date[0]) {
                    // Evento ainda é válido!
                    eventos_filtered[idEvento] = eventosObj[idEvento];
                } else {
                    fechar_evento = true;
                }

                if (fechar_evento) {
                    await Eventos.closeEvento(idEvento)
                        .catch(err => console.log(err));
                }
            }

            await checkFinalApostas();

            console.log(eventos_filtered);
            res.jsonp(eventos_filtered);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Erro na listagem: ' + err)
        });
});

/* Listar informação completa de um Evento. */
router.get('/eventos/:idEvento', async function(req, res) {
    await Eventos.getInfoEvento(req.params.idEvento)
        .then(info => {
            var infoObj = JSON.parse(JSON.stringify(info[0]));

            /* Objeto a Devolver. */
            var infoEvento = {
                idEvento: infoObj[0].idEvento,
                Estado: infoObj[0].Estado,
                DiaHora: infoObj[0].DiaHora,
                idCategoria: infoObj[0].idCategoria,
                Categoria: infoObj[0].CatDesig,
                participantes: {},
                odds: {}
            }

            for (let i = 0; i < infoObj.length; i++) {
                var idRes = '' + infoObj[i].idResultado;

                infoEvento['participantes'][idRes] = infoObj[i].ResDesig;
                infoEvento['odds'][idRes] = infoObj[i].Odd;
            }

            res.jsonp(infoEvento);
        })
        .catch(errEv => res.status(500).send('Erro na listagem: ' + errEv));
});

/* Devolve informação para utilizador PREMIUM. */
router.get('/infoParticipante/:participante', async function(req, res, next) {
    await Resultados.getInfoParticipante(req.params.participante)
        .then(dados => {
            console.log(dados);
            res.jsonp(dados);
        })
        .catch(err => {
            console.log(err);
            res.send('Erro ao obter informação de participante: ' + err);
        });
});

/* Devolve todas as Apostas de um determinado Utilizador. */
router.get('/apostas/:email', async function(req, res, next) {
    await Apostas.getApostasByEmail(req.params.email)
        .then(dados => {
            res.jsonp(dados);
        })
        .catch(err => console.log(err));
});

/* Cria uma Aposta nova para um determinado Utilizador e posteriormente subtrai o seu total de coins. */
router.post('/apostar', authMiddleware, async function(req, res, next) {
    await Apostas.registarAposta(req.session.passport.user, req.body)
        .then(info => {
            Utilizadores.subtractCoins(info.email, info.coins)
                .then(dados => {
                    res.jsonp(dados);
                })
                .catch(errSub => {
                    console.log(errSub);
                    res.send('Erro ao subtrair coins do utilizador: ' + errSub);
                })
        })
        .catch(errAp => {
            console.log(errAp);
            res.send('Erro no registo da aposta: ' + errAp);
        });
});

/* Inserir número de coins em utilizador. */
router.post('/coins', function (req, res, next) {
   Utilizadores.addCoins(req.body.email, req.body.moedas)
       .then(dados => {
           res.jsonp(dados);
       })
       .catch(err => {
           console.log(err);
           res.send('Erro no carregamento de moedas: ' + err);
       });
});

/* Insere um evento na base de dados. */
router.post('/evento', async function(req, res, next) {
    await Eventos.insertEvento(req.body)
        .then(dados => res.jsonp(dados))
        .catch(err => console.log(err));
});

/* Inserir Categoria. */
router.post('/categoria', authMiddleware, function(req, res) {
    Categorias.insertCategoria(req.body.novaCategoria)
        .then(dados => res.jsonp(dados))
        .catch(err => {
            console.log(err);
            res.send('Erro na inserção de nova categoria: ' + err);
        })
});

router.post('/resultado', authMiddleware, function(req, res, next) {
    Resultados.insertResultado(req.body.novoParticipante)
        .then(dados => res.jsonp(dados))
        .catch(err => {
            console.log(err);
            res.send('Erro na inserção de novo participante: ' + err);
        })
});

module.exports = router;
