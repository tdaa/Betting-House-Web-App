const Categoria = require('../models/categoria');
const Categorias = module.exports;

Categorias.listar = function() {
    return Categoria.findAll({ 
        attributes: ['Designacao'],
        raw: true // Permite obter object JSON.
    });
}
