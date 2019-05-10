var models = require('../models');
const Eventos = module.exports;

Eventos.listar = async function() {
    /*
    return models.Evento.findAll({
        attributes: ['idEvento', 'Estado', 'DiaHora', 'idCategoria'],
        raw: true // Permite obter objecto JSON.
    }); */
    let query = `SELECT Eventos.*, Categoria.Designacao AS CatDesig, 
                 Resultados.idResultado, Resultados.Designacao AS ResDesig, Odds.*
                    FROM Eventos
                    JOIN Categoria 
                        ON Categoria.idCategoria = Eventos.idCategoria
                    JOIN Evento_has_Resultados 
                        ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
                    JOIN Resultados 
                        ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado
                    JOIN Resultado_has_Odds 
                        ON (Resultado_has_Odds.ResultadoIdResultado = Resultados.idResultado 
                            AND Resultado_has_Odds.EventoIdEvento = Eventos.idEvento)
                    JOIN Odds 
                        ON Odds.idOdd = Resultado_has_Odds.OddIdOdd`;

    let res = await models.sequelize.query(query, {}, { type: models.sequelize.QueryTypes.SELECT });
    return res;
}

Eventos.getInfoEvento = async function(idEv) {
    let query = `SELECT Eventos.*, Categoria.Designacao AS CatDesig, 
                 Resultados.idResultado, Resultados.Designacao AS ResDesig, Odds.*
                    FROM Eventos
                    JOIN Categoria 
                        ON Categoria.idCategoria = Eventos.idCategoria
                    JOIN Evento_has_Resultados 
                        ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
                    JOIN Resultados 
                        ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado
                    JOIN Resultado_has_Odds 
                        ON (Resultado_has_Odds.ResultadoIdResultado = Resultados.idResultado 
                            AND Resultado_has_Odds.EventoIdEvento = Eventos.idEvento)
                    JOIN Odds 
                        ON Odds.idOdd = Resultado_has_Odds.OddIdOdd
                WHERE Eventos.idEvento = ?;`;
    
    let res = await models.sequelize.query(query, { replacements: [idEv] }, { type: models.sequelize.QueryTypes.SELECT });
    return res;
}