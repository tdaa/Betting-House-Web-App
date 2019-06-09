var
    express      = require('express'),
    Utilizadores = require('../controllers/utilizadores'),
    Categorias   = require('../controllers/categorias'),
    Resultados   = require('../controllers/resultados'),
    Eventos      = require('../controllers/eventos'),
    Odds         = require('../controllers/odds'),
    router       = express.Router();


// Middleware que verifica se o utilizador tem login no sistema.
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('You are not authenticated!');
    } else {
        return next();
    }
}

/* Obtém utilizador em sessão. */
router.get('/session', authMiddleware, function(req, res) {
    Utilizadores.getUserByID(req.session.passport.user)
        .then(dados => {
            let user = JSON.parse(JSON.stringify(dados[0]));
            res.jsonp(user);
        })
        .catch(err => res.status(500).send('Erro ao obter utilizador: ' + err));
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

/* Listar Eventos e informação completa. */
router.get('/eventos', async function(req, res) {
    await Eventos.listar()
        .then(dados => {
            var dadosObj = JSON.parse(JSON.stringify(dados[0]));
            var eventosObj = {};
            
            for (let i = 0; i < dadosObj.length; i++) {
                var evento = dadosObj[i];
                var idEv   = '' + evento.idEvento;
                var idRes  = '' + evento.idResultado;

                if (eventosObj[idEv]) {
                    eventosObj[idEv]['participantes'][idRes] = evento['ResDesig'];
                    eventosObj[idEv]['odds'][idRes] = evento['Valor'];
                } else {
                    var infoObj = `{
                        "Estado": ${evento['Estado']},
                        "DiaHora": "${evento['DiaHora']}",
                        "idCategoria": ${evento['idCategoria']},
                        "Categoria": "${evento['CatDesig']}",
                        "participantes": { "${idRes}": "${evento['ResDesig']}" },
                        "odds": { "${idRes}": ${evento['Valor']} }
                    }`;

                    eventosObj[idEv] = JSON.parse(infoObj);
                }
            }

            res.jsonp(eventosObj);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
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
                infoEvento['odds'][idRes] = infoObj[i].Valor;
            }

            res.jsonp(infoEvento);
        })
        .catch(errEv => res.status(500).send('Erro na listagem: ' + errEv));
});

/* Listar todas as Odds. */
router.get('/odds', function(req, res) {
    res.jsonp([]);
});

/* Listar as Odds de uma equipa. */
router.get('/odds/:id', function(req, res) {
    Odds.getOdds(req.params.id)
        .then(dados => {
            console.log(dados);
            res.jsonp(dados[0]);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
});

/* Cria uma Aposta nova para um determinado Utilizador. */
router.post('/apostar', authMiddleware, function(req, res, next) {
    console.log('Body Data: ' + JSON.stringify(req.body));
    res.jsonp([]);
});

module.exports = router;
