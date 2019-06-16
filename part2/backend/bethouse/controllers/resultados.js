var models = require('../models');
const Resultados = module.exports;

Resultados.listar = function() {
    return models.Resultado.findAll({
        attributes: ['idResultado', 'Designacao'],
        raw: true // Permite obter object JSON.
    });
}

Resultados.insertResultado = async function(new_res) {
    let set_res = await models.sequelize.query(
        'INSERT INTO Resultados (Designacao) VALUES (?);',
        { replacements: [new_res] },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    let get_idRes = await models.sequelize.query(
        'SELECT idResultado FROM Resultados WHERE Designacao = ?;',
        { replacements: [new_res] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_res = JSON.parse(JSON.stringify(get_idRes[0][0].idResultado));

    return { idResultado: id_res, Designacao: new_res };
}

Resultados.getInfoParticipante = async function(nome_part) {

    /* Obter ID do participante. */
    let get_idRes = await models.sequelize.query(
        'SELECT idResultado FROM Resultados WHERE Designacao = ?;',
        { replacements: [nome_part] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_res = JSON.parse(JSON.stringify(get_idRes[0][0].idResultado));

    /* Calcular o total de eventos em que o participante participou. */
    let get_matches = await models.sequelize.query(
        `SELECT COUNT(EventoIdEvento) AS total FROM Evento_has_Resultados
        JOIN Eventos On Eventos.idEvento = EventoIdEvento
        WHERE ResultadoIdResultado = ? AND Eventos.Estado = ?;`,
        { replacements: [id_res, 0] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const total_matches = JSON.parse(JSON.stringify(get_matches[0][0].total));

    /* Calcular o total de eventos que o participante ganhou. */
    let get_victories = await models.sequelize.query(
        `SELECT COUNT(idEvento) AS vitorias FROM Eventos
        WHERE Vencedor = ?;`,
        { replacements: [nome_part] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const total_victories = JSON.parse(JSON.stringify(get_victories[0][0].vitorias));

    
    return { num_matches: total_matches, num_victories: total_victories };
}