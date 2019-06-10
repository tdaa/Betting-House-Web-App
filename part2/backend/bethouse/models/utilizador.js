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
                allowNull: false,
                unique: true
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Tipo: {
                type: DataTypes.CHAR(1),
                allowNull: false
            },
            EssCoins: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            ValorPago: {
                type: DataTypes.DOUBLE,
                allowNull: true
            },
            isPremium: {
                type: DataTypes.TINYINT,
                allowNull: false
            }
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