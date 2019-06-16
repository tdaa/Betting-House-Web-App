'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento = sequelize.define('Evento', 
        {
            idEvento: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Estado: {
                type: DataTypes.STRING,
                allowNull: false,
                default: 1
            },
            DiaHora: {
                type: DataTypes.DATE,
                allowNull: false
            },
            Vencedor: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    /* Relações */
    Evento.associate = function(models) {
        models.Evento
            .belongsTo(models.Categoria, { 
                foreignKey: 'idCategoria', targetKey: 'idCategoria' 
            });

        models.Evento
            .belongsToMany(models.Resultado, { 
                through: models.Evento_has_Resultado
            });
        
        models.Evento
            .belongsToMany(models.Aposta, { 
                through: models.Evento_in_Aposta
            });
    }

    return Evento;
};