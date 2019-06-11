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