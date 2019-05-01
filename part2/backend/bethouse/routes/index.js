var express    = require('express');
var Categorias = require('../controllers/categorias');
var Resultados = require('../controllers/resultados');
var Eventos    = require('../controllers/eventos');
var Odds       = require('../controllers/odds');
var router     = express.Router();


/* Listar Categorias. */
router.get('/categorias', function(req, res) {
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
                var idEv = '' + evento.idEvento;
                if (eventosObj[idEv]) {
                    eventosObj[idEv]['Participante' + (i + 1)] = evento['Designacao'];
                    eventosObj[idEv]['Odd' + (i + 1)] = evento['Valor'];
                } else {
                    const Participante = 'Participante' + (i + 1);
                    const Odd = 'Odd' + (i + 1);

                    var infoObj = `{
                        "Estado": ${evento['Estado']},
                        "DiaHora": "${evento['DiaHora']}",
                        "idCategoria": ${evento['idCategoria']},
                        "${Participante}": "${evento['Designacao']}",
                        "${Odd}": ${evento['Valor']}
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
                idCategoria: infoObj[0].idCategoria
            }

            for (let i = 0; i < infoObj.length; i++) {
                infoEvento['Participante' + (i + 1)] = infoObj[i].Designacao;
                infoEvento['Odd' + (i + 1)] = infoObj[i].Valor;
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

module.exports = router;
