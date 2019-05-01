var models = require('../models');
const Categorias = module.exports;

Categorias.listar = function() {
    return models.Categoria.findAll({
        attributes: ['idCategoria', 'Designacao'],
        raw: true // Permite obter object JSON.
    });
}