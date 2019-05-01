'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento_has_Resultado = 
        sequelize
            .define('Evento_has_Resultado', {}, { timestamps: false });

    return Evento_has_Resultado;
};