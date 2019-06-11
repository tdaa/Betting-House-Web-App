var models = require('../models');
const Apostas = module.exports;


Apostas.registarAposta = async function(idUser, boletim) {

    /* Obter email do Utilizador. */
    let get_email = await models.sequelize.query(
        'SELECT Utilizadors.Email FROM Utilizadors WHERE Utilizadors.id = ?',
        { replacements: [idUser] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const email_user = JSON.parse(JSON.stringify(get_email[0][0].Email));


    /* Fazer o registo da aposta e obter o seu id depois de inserção */
    let set_aposta = await models.sequelize.query(
        'INSERT INTO Aposta (Valor, Estado, Utilizador_Email) VALUES (?, ?, ?);',
        { replacements: [boletim[0].valor, 'ABERTA', email_user] },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    let get_idAposta = await models.sequelize.query(
        'SELECT Aposta.idAposta FROM Aposta ORDER BY Aposta.idAposta DESC LIMIT 1;',
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_aposta = JSON.parse(JSON.stringify(get_idAposta[0].idAposta));


    /* Associar aposta aos eventos respetivos. */
    for (const obj of boletim) {
        let id_evento = parseInt(obj.evento) + 1;
        let equipa    = obj.resultado;
        
        /* Obter id da equipa apostada. */
        let get_idResultado = await models.sequelize.query(
            'SELECT Resultados.idResultado FROM Resultados WHERE Resultados.Designacao = ?',
            { replacements: [equipa] },
            { type: models.sequelize.QueryTypes.SELECT }
        );
        const id_resultado = JSON.parse(JSON.stringify(get_idResultado[0][0].idResultado));

        /* Inserir dados na tabela Evento_in_Aposta. */
        let set_EvInAp = await models.sequelize.query(
            'INSERT INTO Evento_in_Aposta (idResultado_Apostado, ApostumIdAposta, EventoIdEvento) VALUES (?, ?, ?);',
            { replacements: [id_resultado, id_aposta, id_evento] },
            { type: models.sequelize.QueryTypes.INSERT }
        );
    };

    return { email: email_user, coins: boletim[0].valor };
}