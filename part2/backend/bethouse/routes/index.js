var express = require('express');
var Categorias = require('../controllers/categorias');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Categorias.listar()
        .then(dados => {
            console.log(dados);
            res.jsonp(dados);
        })
        .catch(err => res.status(500).send('Erro na listagem: ' + err));
});

module.exports = router;
