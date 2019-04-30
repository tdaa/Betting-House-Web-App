'use strict';

module.exports = (sequelize, DataTypes) => {
    var Odd = sequelize.define('Odd', 
        {
            idOdd: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Valor: DataTypes.DOUBLE
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    Odd.associate = function(models) {
        models.Odd
            .belongsToMany(models.Resultado, { 
                through: models.Resultado_has_Odd 
            });
    }

    return Odd;
};