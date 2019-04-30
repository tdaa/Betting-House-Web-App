'use strict';

module.exports = (sequelize, DataTypes) => {
    var Resultado_has_Odd = 
        sequelize
            .define('Resultado_has_Odd', {}, { timestamps: false });

    return Resultado_has_Odd;
};