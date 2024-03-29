var models = require('../models');
var md5 = require('md5');
const Utilizadores = module.exports;


Utilizadores.getAllInfo = async function() {
    let query = `SELECT * FROM Utilizadors;`;

    let res = await models.sequelize.query(
        query,
        { type: models.sequelize.QueryTypes.SELECT }
    );

    return res;
};

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

        replace = [user_data.email, md5(user_data.password), user_data.nome, 'U', 0, parseInt(user_data.deposito), 1];
    } else {
        query = `INSERT INTO Utilizadors (Email, Password, Nome, Tipo, EssCoins, isPremium)
                 VALUES 
                    (?, ?, ?, ?, ?, ?);`;

        replace = [user_data.email, md5(user_data.password), user_data.nome, 'U', 0, 0];
    }

    let res = await models.sequelize.query(
        query,
        { replacements: replace },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    return res;
}

Utilizadores.subtractCoins = async function(email_user, coins) {
    let query = `UPDATE Utilizadors 
                 SET EssCoins = EssCoins - ?
                 WHERE Utilizadors.Email = ?;`;

    let res = await models.sequelize.query(
        query,
        { replacements: [coins, email_user] },
        { type: models.sequelize.QueryTypes.UPDATE }
    );

    return res;
}

Utilizadores.addCoins = async function (email_user, coins) {
    let query = `UPDATE Utilizadors
                 SET EssCoins = EssCoins + ?
                 WHERE Utilizadors.Email = ?;`;

    let res = await models.sequelize.query(
        query,
        {replacements: [coins, email_user]},
        {type: models.sequelize.QueryTypes.UPDATE}
    );

    return res;
}
