'use strict';

module.exports = (sequelize, DataTypes) => {
    var Categoria = sequelize.define('Categoria', 
        {
            idCategoria: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Designacao: DataTypes.STRING,
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    return Categoria;
};