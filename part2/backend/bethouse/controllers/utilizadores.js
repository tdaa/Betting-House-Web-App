var models = require('../models');
const Utilizadores = module.exports;

Utilizadores.getUser = async function(Email, Password) {
    let query = `SELECT * FROM Utilizadors
                 WHERE Utilizadors.Email = ?, Utilizadors.Password = ?`;

    let res = await models.sequelize.query(
        query, 
        { replacements: [Email, Password] }, 
        { type: models.sequelize.QueryTypes.SELECT }
    );
    
    return res;
}

Utilizadores.getUserByID = async function(id) {
    let query = `SELECT * FROM Utilizadors
                 WHERE Utilizadors.id = ?`;

    let res = await models.sequelize.query(
        query, 
        { replacements: [id] }, 
        { type: models.sequelize.QueryTypes.SELECT }
    );
    
    return res;
}