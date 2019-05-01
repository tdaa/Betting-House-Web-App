var models = require('../models');
const Odds = module.exports;

Odds.getOdds = function(id) {
    let query = `SELECT Odds.Valor 
                    FROM Odds
	                JOIN Resultado_has_Odds ON Resultado_has_Odds.OddIdOdd = Odds.idOdd
	            WHERE Resultado_has_Odds.ResultadoIdResultado = ?;`;

    /* The first object is the result object, 
       the second is the metadata object (containing affected rows etc) - but in mysql, those two are equal. */
    return models.sequelize.query(query, { replacements: [id] }, { type: models.sequelize.QueryTypes.SELECT });
}