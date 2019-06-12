var models = require('../models');
const Administradores = module.exports;


Administradores.getUser = async function(Email, Password) {
    let query = `SELECT * FROM Administradors
                 WHERE Administradors.Email = ?, Administradors.Password = ?`;

    let res = await models.sequelize.query(
        query, 
        { replacements: [Email, Password] }, 
        { type: models.sequelize.QueryTypes.SELECT }
    );
    
    return res;
}

Administradores.getUserByID = async function(id) {
    let query = `SELECT * FROM Administradors
                 WHERE Administradors.id = ?`;

    let res = await models.sequelize.query(
        query, 
        { replacements: [id] }, 
        { type: models.sequelize.QueryTypes.SELECT }
    );
    
    return res;
}