var models = require('../models');
const Resultados = module.exports;

Resultados.listar = function() {
    return models.Resultado.findAll({
        attributes: ['idResultado', 'Designacao'],
        raw: true // Permite obter object JSON.
    });
}
