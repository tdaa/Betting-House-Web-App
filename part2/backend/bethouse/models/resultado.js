'use strict';

module.exports = (sequelize, DataTypes) => {
    var Resultado = sequelize.define('Resultado', 
        {
            idResultado: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Designacao: DataTypes.STRING
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    /* Relações */
    Resultado.associate = function(models) {
        models.Resultado
            .belongsToMany(models.Odd, { 
                through: models.Resultado_has_Odd 
            });

        models.Resultado
            .belongsToMany(models.Evento, { 
                through: models.Evento_has_Resultado
            });
    }

    return Resultado;
};