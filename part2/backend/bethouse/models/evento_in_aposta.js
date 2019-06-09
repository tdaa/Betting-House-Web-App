'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento_in_Aposta = 
        sequelize
            .define('Evento_in_Aposta', {}, { timestamps: false });

    return Evento_in_Aposta;
};