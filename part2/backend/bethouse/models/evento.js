'use strict';

module.exports = (sequelize, DataTypes) => {
    var Evento = sequelize.define('Evento', 
        {
            idEvento: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Estado: {
                type: DataTypes.STRING,
                default: -1
            },
            DiaHora: {
                type: DataTypes.DATE
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
    }

    return Evento;
};