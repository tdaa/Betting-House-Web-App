const Sequelize = require('sequelize');
const db = require('../config/db');

const Categoria = db.define('Categoria', {
    Designacao: {
        type: Sequelize.STRING
    }
});

module.exports = Categoria;