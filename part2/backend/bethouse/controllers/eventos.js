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
                        ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado;`;

    let res = await models.sequelize.query(query, {}, { type: models.sequelize.QueryTypes.SELECT });
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