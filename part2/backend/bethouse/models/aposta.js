'use strict';

module.exports = (sequelize, DataTypes) => {
    var Aposta = sequelize.define('Aposta', 
        {
            idAposta: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Valor: {
                type: DataTypes.DOUBLE,
                allowNull: false
                
            },
            Estado: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    /* Relações */
    Aposta.associate = function(models) {
        models.Aposta
            .belongsTo(models.Utilizador, { 
                foreignKey: 'Utilizador_Email', targetKey: 'Email' 
            });

        models.Aposta
            .belongsToMany(models.Evento, { 
                through: models.Evento_in_Aposta
            });
    }

    return Aposta;
};