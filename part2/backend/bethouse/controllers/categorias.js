var models = require('../models');
const Categorias = module.exports;

Categorias.listar = function() {
    return models.Categoria.findAll({
        attributes: ['idCategoria', 'Designacao'],
        raw: true // Permite obter object JSON.
    });
}

Categorias.inserir = async function(new_cat) {
    let set_cat = await models.sequelize.query(
        'INSERT INTO Categoria (Designacao) VALUES (?);',
        { replacements: [new_cat] },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    let get_idCategoria = await models.sequelize.query(
        'SELECT idCategoria FROM Categoria WHERE Designacao = ? ORDER BY idCategoria DESC LIMIT 1;',
        { replacements: [new_cat] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_categoria = JSON.parse(JSON.stringify(get_idCategoria[0][0].idCategoria));

    return { idCategoria: id_categoria, Designacao: new_cat };
}