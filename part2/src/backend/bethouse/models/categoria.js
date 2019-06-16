'use strict';

module.exports = (sequelize, DataTypes) => {
    var Categoria = sequelize.define('Categoria', 
        {
            idCategoria: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Designacao: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            // Evita que sejam criados os campos "createdAt" e "updatedAt".
            timestamps: false
        }
    );

    return Categoria;
};