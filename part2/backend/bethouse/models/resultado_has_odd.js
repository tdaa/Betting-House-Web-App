'use strict';

module.exports = (sequelize, DataTypes) => {
    var Resultado_has_Odd = 
        sequelize
            .define('Resultado_has_Odd', {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    // "Hack" para modificar o UNIQUE gerado.
                    unique: 'Resultado_has_Odds_ResultadoIdResultado_OddIdOdd_unique'
                },
                EventoIdEvento: {
                    type: DataTypes.INTEGER // Para determinar qual o Evento pretendido.
                }
             }, { timestamps: false });

    return Resultado_has_Odd;
};