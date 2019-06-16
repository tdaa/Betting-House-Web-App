'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento_has_Resultado = 
        sequelize
            .define('Evento_has_Resultado', {
                Odd: {
                    type: DataTypes.DOUBLE,
                    allowNull: true
                }
            }, { timestamps: false });

    return Evento_has_Resultado;
};