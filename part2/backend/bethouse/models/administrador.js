'use strict';

//var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    var Administrador = sequelize.define('Administrador', 
        {   
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            Password: {
                type: DataTypes.STRING,
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

    return Administrador;
};