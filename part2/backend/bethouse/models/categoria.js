'use strict';

module.exports = (sequelize, DataTypes) => {
    var Categoria = sequelize.define('Categoria', 
        {
            idCategoria: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            Designacao: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    return Categoria;
};