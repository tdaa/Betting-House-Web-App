'use strict';

//var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    var Utilizador = sequelize.define('Utilizador', 
        {   
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Email: {
                type: DataTypes.STRING,
                unique: true
            },
            Password: DataTypes.STRING,
            Nome: DataTypes.STRING,
            Tipo: DataTypes.CHAR(1),
            EssCoins: DataTypes.DOUBLE,
            ValorPago: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            isPremium: DataTypes.TINYINT
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false,
            /*
            hooks: {
                beforeCreate: (utilizador) => {
                    const salt = bcrypt.genSaltSync();
                    utilizador.Password = bcrypt.hashSync(utilizador.Password, salt);
                }
            },

            instanceMethods: {
                validPassword: function(Password) {
                    return bcrypt.compareSync(Password, this.Password);
                }
            } */
        }
    );

    return Utilizador;
};