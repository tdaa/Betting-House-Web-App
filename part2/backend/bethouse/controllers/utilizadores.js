var models = require('../models');
var bcrypt = require('bcrypt');
const Utilizadores = module.exports;


async function hash(password) {
    let hash_pass = await bcrypt.hash(password, 10);
    return hash_pass;
}

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

Utilizadores.registerUser = async function(user_data) {
    var query;
    var replace = [];

    if (user_data.premium) {
        query = `INSERT INTO Utilizadors (Email, Password, Nome, Tipo, EssCoins, ValorPago, isPremium)
                 VALUES 
                    (?, ?, ?, ?, ?, ?, ?);`;

        replace = [user_data.email, /* Fazer hash! */user_data.password, user_data.nome, 'U', 0, parseInt(user_data.deposito), 1];
    } else {
        query = `INSERT INTO Utilizadors (Email, Password, Nome, Tipo, EssCoins, isPremium)
                 VALUES 
                    (?, ?, ?, ?, ?, ?);`;
        
        replace = [user_data.email, /* Fazer hash! */user_data.password, user_data.nome, 'U', 0, 0];
    }

    let res = await models.sequelize.query(
        query, 
        { replacements: replace }, 
        { type: models.sequelize.QueryTypes.INSERT }
    );
    
    return res;
}