var express    = require('express');
var Categorias = require('../controllers/categorias');
var Resultados = require('../controllers/resultados');
var Eventos    = require('../controllers/eventos');
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

/* Listar Eventos. */
router.get('/eventos', function(req, res) {
    Eventos.listar()
        .then(dados => {
            console.log(dados);
            res.jsonp(dados);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
});

module.exports = router;
