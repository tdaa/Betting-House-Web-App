const Sequelize = require('sequelize');

module.exports = new Sequelize('BetWeb', 'root', 'vacsmgcs1415', {
    host: 'localhost',
    dialect: 'mysql',
});