var models = require('../models');
const Apostas = module.exports;


Apostas.getApostasByEmail = async function(email) {
    var lstApostas = [];
    
    /* Obter todos os ids de Apostas. */
    let get_idsApostas = await models.sequelize.query(
        'SELECT * FROM Aposta WHERE Utilizador_Email = ?',
        { replacements: [email] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    var idsApostas = JSON.parse(JSON.stringify(get_idsApostas[0]));
    
    for (let i = 0; i < idsApostas.length; i++) {
        var apostaObj = {};

        var idAposta = idsApostas[i].idAposta;
        var valor    = idsApostas[i].Valor;
        var estado   = (idsApostas[i].Estado == 'ABERTA') ? 1 : 0 ;

        apostaObj['idAposta'] = idAposta;
        apostaObj['valor'] = valor;
        apostaObj['estado'] = estado;

        let get_eventos_aposta = await models.sequelize.query(
            `SELECT Evento_in_Aposta.EventoIdEvento AS idEvento, 
                    Resultados.Designacao AS resultadoApostado, 
                    Evento_has_Resultados.Odd AS odd
            FROM Evento_in_Aposta
            JOIN Evento_has_Resultados ON Evento_has_Resultados.EventoIdEvento = Evento_in_Aposta.EventoIdEvento 
                AND Evento_has_Resultados.ResultadoIdResultado = Evento_in_Aposta.idResultado_Apostado
            JOIN Resultados ON Resultados.idResultado = Evento_in_Aposta.idResultado_Apostado
            WHERE Evento_in_Aposta.ApostumIdAposta = ?;`,
            { replacements: [idAposta] },
            { type: models.sequelize.QueryTypes.SELECT }
        );
        var eventos = JSON.parse(JSON.stringify(get_eventos_aposta[0]));
        var ganhos = valor;
        for (const ev in eventos)
            ganhos *= eventos[ev].odd;
        
        apostaObj['ganhosPossiveis'] = ganhos;
        apostaObj['eventos'] = eventos;

        lstApostas.push(apostaObj);
    }

    return lstApostas;
}

Apostas.registarAposta = async function(idUser, boletim) {

    /* Obter email do Utilizador. */
    let get_email = await models.sequelize.query(
        'SELECT Utilizadors.Email FROM Utilizadors WHERE Utilizadors.id = ?',
        { replacements: [idUser] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const email_user = JSON.parse(JSON.stringify(get_email[0][0].Email));


    /* Fazer o registo da aposta e obter o seu id depois de inserção */
    let set_aposta = await models.sequelize.query(
        'INSERT INTO Aposta (Valor, Estado, Utilizador_Email) VALUES (?, ?, ?);',
        { replacements: [boletim[0].valor, 'ABERTA', email_user] },
        { type: models.sequelize.QueryTypes.INSERT }
    );

    let get_idAposta = await models.sequelize.query(
        'SELECT Aposta.idAposta FROM Aposta WHERE Aposta.Utilizador_Email = ? ORDER BY Aposta.idAposta DESC LIMIT 1;',
        { replacements: [email_user] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    const id_aposta = JSON.parse(JSON.stringify(get_idAposta[0][0].idAposta));


    /* Associar aposta aos eventos respetivos. */
    for (const obj of boletim) {
        let id_evento = parseInt(obj.evento);
        let equipa    = obj.resultado;
        
        /* Obter id da equipa apostada. */
        let get_idResultado = await models.sequelize.query(
            'SELECT Resultados.idResultado FROM Resultados WHERE Resultados.Designacao = ?',
            { replacements: [equipa] },
            { type: models.sequelize.QueryTypes.SELECT }
        );
        const id_resultado = JSON.parse(JSON.stringify(get_idResultado[0][0].idResultado));

        /* Inserir dados na tabela Evento_in_Aposta. */
        let set_EvInAp = await models.sequelize.query(
            'INSERT INTO Evento_in_Aposta (idResultado_Apostado, ApostumIdAposta, EventoIdEvento) VALUES (?, ?, ?);',
            { replacements: [id_resultado, id_aposta, id_evento] },
            { type: models.sequelize.QueryTypes.INSERT }
        );
    };

    return { email: email_user, coins: boletim[0].valor };
}

Apostas.checkFinalApostas = async function() {
    console.log('\nEntrei controller apostas!\n');

    /* Obter todos os ids das Apostas. */
    let get_idsApostas = await models.sequelize.query(
        'SELECT Aposta.idAposta, Aposta.Valor, Aposta.Utilizador_Email FROM Aposta WHERE Aposta.Estado = ?',
        { replacements: ['ABERTA'] },
        { type: models.sequelize.QueryTypes.SELECT }
    );
    var idsApostas = JSON.parse(JSON.stringify(get_idsApostas[0]));

    /* Percorrer cada Aposta e verificar se está terminada. */
    for (let i = 0; i < idsApostas.length; i++) {
        var idAposta = idsApostas[i].idAposta;
        
        let get_vencedores = await models.sequelize.query(
            `SELECT idEvento, Vencedor, idResultado_Apostado FROM Aposta
            JOIN Evento_in_Aposta ON ApostumIdAposta = idAposta
            JOIN Eventos ON idEvento = EventoIdEvento
            WHERE idAposta = ?;`,
            { replacements: [idAposta] },
            { type: models.sequelize.QueryTypes.SELECT }
        );
        
        var vencedores = JSON.parse(JSON.stringify(get_vencedores[0]));
        const res = await vencedores.filter(obj => obj.Vencedor == null);
        
        if (res.length == 0) {
            // Podemos fechar a aposta!
            var odds = [];
            var flag = false;

            for (let j = 0; j < vencedores.length && flag != true; j++) {
                var vencedor = vencedores[i];

                let get_equipa_apostada = await models.sequelize.query(
                    `SELECT EventoIdEvento, Odd, Designacao
                    FROM Evento_has_Resultados
                    JOIN Resultados ON idResultado = ResultadoIdResultado
                    WHERE EventoIdEvento = ? AND ResultadoIdResultado = ?;`,
                    { replacements: [vencedor.idEvento, vencedor.idResultado_Apostado] },
                    { type: models.sequelize.QueryTypes.SELECT }
                );
                const equipa_apostada = JSON.parse(JSON.stringify(get_equipa_apostada[0][0]));

                if (equipa_apostada.Designacao !== vencedor.Vencedor)
                    flag = true;
                else
                    odds.push(equipa_apostada.Odd);
            }

            if (!flag) {
                let valor = idsApostas[i].Valor;
                let email = idsApostas[i].Utilizador_Email;

                const reducer = (accumulator, currentValue) => accumulator * currentValue;
                const coins_won = odds.reduce(reducer) * valor;

                /* Adiciona coins ganhas ao total que o utilizador tem. */
                let set_coins = await models.sequelize.query(
                    `UPDATE Utilizadors SET EssCoins = EssCoins + ?
                    WHERE Utilizadors.Email = ?;`,
                    { replacements: [coins_won, email] },
                    { type: models.sequelize.QueryTypes.UPDATE }
                );

                /* Fechar Aposta. */
                let set_aposta_fechada = await models.sequelize.query(
                    `UPDATE Aposta SET Estado = 'FECHADA'
                    WHERE Aposta.Utilizador_Email = ?;`,
                    { replacements: [email] },
                    { type: models.sequelize.QueryTypes.UPDATE }
                );
            }
        } else {
            // Ainda existem eventos por fechar!
            console.log('Ainda existem eventos por fechar...');
        }
    }

    return {};
}