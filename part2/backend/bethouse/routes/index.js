var express = require('express');
var Categorias = require('../controllers/categorias');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Categorias.listar()
        .then(dados => console.log(dados))
        .catch(err => console.log(err));
});

module.exports = router;
