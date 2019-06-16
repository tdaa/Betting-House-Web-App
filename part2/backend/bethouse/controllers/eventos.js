var models = require('../models');
const Eventos = module.exports;

Eventos.listar = async function() {
    let query = `SELECT Eventos.idEvento, Eventos.Estado, Eventos.DiaHora, Eventos.idCategoria,
                    Categoria.Designacao AS CatDesig, Evento_has_Resultados.Odd, 
                    Resultados.idResultado, Resultados.Designacao AS ResDesig
                    FROM Eventos
                    JOIN Categoria 
                        ON Categoria.idCategoria = Eventos.idCategoria
                    JOIN Evento_has_Resultados 
                        ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
                    JOIN Resultados 
                        ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado
                WHERE Eventos.Estado = ?;`;

    let res = await models.sequelize.query(query, { replacements: [1] }, { type: models.sequelize.QueryTypes.SELECT });
    return res;
}

Eventos.getInfoEvento = async function(idEv) {
    let query = `SELECT Eventos.idEvento, Eventos.Estado, Eventos.DiaHora, Eventos.idCategoria,
                    Categoria.Designacao AS CatDesig, Evento_has_Resultados.Odd,
                    Resultados.idResultado, Resultados.Designacao AS ResDesig
                    FROM Eventos
                    JOIN Categoria 
                        ON Categoria.idCategoria = Eventos.idCategoria
                    JOIN Evento_has_Resultados 
                        ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
                    JOIN Resultados 
                        ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado
                WHERE Eventos.idEvento = ?;`;
    
    let res = await models.sequelize.query(query, { replacements: [idEv] }, { type: models.sequelize.QueryTypes.SELECT });
    return res;
}

Eventos.closeEvento = async function(idEv) {

    /* Obter nome dos participantes de um determinado evento. */
    let get_participantes = await models.sequelize.query(
        `SELECT Resultados.Designacao FROM Resultados
        JOIN Evento_has_Resultados ON Evento_has_Resultados.EventoIdEvento = ?
        WHERE Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado;`,
        { replacements: [idEv] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const participantes = JSON.parse(JSON.stringify(get_participantes[0]));
    
    var vencedor = participantes[Math.floor(Math.random() * participantes.length)].Designacao;

    
    /* Mudar estado do Evento e associar um Vencedor. */
    let update_evento = await models.sequelize.query(
        `UPDATE Eventos SET Estado = ?, Vencedor = ?
        WHERE Eventos.idEvento = ?;`,
        { replacements: [0, vencedor, idEv] },
        { type: models.sequelize.QueryTypes.UPDATE }
    );
    
    return {};
}

Eventos.insertEvento = async function(eventoObj) {
    var categoria = eventoObj.categoria;
    var diahora = eventoObj.diahora;

    /* Obter id da categoria do evento em questão. */
    let get_idCategoria = await models.sequelize.query(
        `SELECT idCategoria FROM Categoria WHERE Designacao = ?;`,
        { replacements: [categoria] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    var id_categoria = JSON.parse(JSON.stringify(get_idCategoria[0][0])).idCategoria;


    /* Inserção na tabela 'Evento' e query para obter o ID recentemente adicionado. */
    let set_ev = await models.sequelize.query(
        'INSERT INTO Eventos (Estado, DiaHora, idCategoria) VALUES (?, ?, ?);',
        { replacements: [1, diahora, id_categoria] },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    let get_idEvento = await models.sequelize.query(
        'SELECT idEvento FROM Eventos ORDER BY idEvento DESC LIMIT 1;',
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_evento = JSON.parse(JSON.stringify(get_idEvento[0].idEvento));


    /* Obter ID's dos participantes e inserir entradas na tabela Evento_has_Resultados. */
    for (let i = 0; i < eventoObj.resOdds.length; i++) {
        var equipaObj = eventoObj.resOdds[i];

        let get_idParticipante = await models.sequelize.query(
            'SELECT idResultado FROM Resultados WHERE Designacao = ?;',
            { replacements: [equipaObj.participante] },
            { type: models.sequelize.QueryTypes.SELECT }
        );
        const id_participante = JSON.parse(JSON.stringify(get_idParticipante[0][0].idResultado));
        
        let set_EvRes = await models.sequelize.query(
            'INSERT INTO Evento_has_Resultados (Odd, EventoIdEvento, ResultadoIdResultado) VALUES (?, ?, ?);',
            { replacements: [equipaObj.odd, id_evento, id_participante] },
            { type: models.sequelize.QueryTypes.INSERT }
        );
    }

    return {};
}