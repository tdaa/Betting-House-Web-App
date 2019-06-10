'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento_in_Aposta = 
        sequelize
            .define('Evento_in_Aposta', {
                idResultado_Apostado: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            }, { timestamps: false });

    return Evento_in_Aposta;
};