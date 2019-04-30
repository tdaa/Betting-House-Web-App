var models = require('../models');
const Eventos = module.exports;

Eventos.listar = function() {
    return models.Evento.findAll({
        attributes: ['idEvento', 'Estado', 'DiaHora', 'idCategoria'],
        raw: true // Permite obter object JSON.
    });
}
