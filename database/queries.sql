###### SELECTS ######

select * from Administradors;

select * from Utilizadors;

select * from Aposta;

select * from Evento_in_Aposta;

select * from Categoria;

select * from Resultados;

select * from Eventos;

select * from Evento_has_Resultados;


###### INSERTS ######
insert into Administradors (id, Password)
	values
		('betadmin@bettinghouse.com', '431b408ac46e2f34c3a455db2488daf5');

insert into Utilizadors (id, Email, Password, Nome, Tipo, EssCoins, ValorPago, isPremium)
	values 
    (1, 'apostador@betess.com', '542868f6d2b00549c09e8d23761d816f', 'Miguel Armindo', 'U', 100000, 50, 1);

insert into Categoria (idCategoria, Designacao)
	values
		(1, 'Futebol'),
        (2, 'Basquetebol'),
        (3, 'Hóquei'),
        (4, 'Andebol'),
        (5, 'Rugby');
        
insert into Resultados (idResultado, Designacao)
	values
		(1, 'EMPATE'),
		(2, 'Desportivo das Aves'),
        (3, 'Benfica'),
        (4, 'Porto');
	
insert into Eventos (idEvento, Estado, DiaHora, idCategoria)
	values
		(1, 1, '2019-05-01 21:30:05', 1),
		(2, 1, '2019-10-01 21:30:05', 1);
        
insert into Eventos (idEvento, Estado, DiaHora, idCategoria)
	values
		(10, 1, '2019-06-16 17:00:00', 1);
        
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado, Odd)
	values
		(10, 1, 5.0),
		(10, 3, 3.7),
		(10, 4, 2.1);
	
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado, Odd)
	values
		(1, 1, 1.5),
		(1, 2, 2.4),
		(1, 4, 5.6),
        (2, 1, 1.4),
		(2, 2, 3.7),
        (2, 3, 5.6);


##### QUERIES #####

# Apaga o registo de uma Utilizador.
DELETE FROM `Utilizadors` WHERE `id` = 1;

# Apaga o registo de uma Aposta.
DELETE FROM `Aposta` WHERE `idAposta` = 5;

# Apaga o registo de uma Categoria.
DELETE FROM `Categoria` WHERE `idCategoria` = 13;

# Apaga o registo de um Evento.
DELETE FROM `Eventos` WHERE `idEvento` = 13;

# Apaga o registo de um Resultado.
DELETE FROM `Resultados` WHERE `idResultado` = 10;

# Altera uma data de um determinado Evento.
UPDATE Eventos 
SET DiaHora = '2019-10-01 21:30:05'
WHERE Eventos.idEvento = 2;

# Alterar informaçoes de um Evento.
UPDATE Eventos 
SET Estado = 0, Vencedor = 'EMPATE'
WHERE Eventos.idEvento = 3;
    
# Seleciona todas as equipas de um determinado evento.
SELECT Resultados.Designacao FROM Resultados
	JOIN Evento_has_Resultados ON Evento_has_Resultados.ResultadoIdResultado = Resultados.idResultado
    WHERE Evento_has_Resultados.EventoIdEvento = 1;

# Seleciona, para cada Evento, as informaçao pertinentes.
SELECT Eventos.idEvento, Eventos.Estado, Eventos.DiaHora, Eventos.idCategoria,
			   Categoria.Designacao AS CatDesig, Evento_has_Resultados.Odd, 
			   Resultados.idResultado, Resultados.Designacao AS ResDesig
	FROM Eventos
	JOIN Categoria ON Categoria.idCategoria = Eventos.idCategoria
	JOIN Evento_has_Resultados ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
	JOIN Resultados ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado;
    



SELECT Evento_in_Aposta.EventoIdEvento AS idEvento, Resultados.Designacao AS resultadoApostado, Evento_has_Resultados.Odd AS odd
            FROM Evento_in_Aposta
            JOIN Evento_has_Resultados ON Evento_has_Resultados.EventoIdEvento = Evento_in_Aposta.EventoIdEvento 
                AND Evento_has_Resultados.ResultadoIdResultado = Evento_in_Aposta.idResultado_Apostado
            JOIN Resultados ON Resultados.idResultado = Evento_in_Aposta.idResultado_Apostado
            WHERE Evento_in_Aposta.ApostumIdAposta = 7;





select u.id, u.Email, u.Nome, a.idAposta, a.Valor, 
	a.Estado, e.idEvento, r.Designacao, er.Odd
    
    from Utilizadors as u
    inner join Aposta as a
	on u.Email = a.Utilizador_Email
		inner join Evento_in_Aposta as ea
        on a.idAposta = ea.ApostumIdAposta
			inner join Eventos as e
            on e.idEvento = ea.EventoIdEvento
				inner join Evento_has_Resultados as er
                on er.EventoIdEvento = e.idEvento
					inner join Resultados as r
                    on r.idResultado= er.ResultadoIdResultado
                    
                    where r.idResultado = ea.idResultado_Apostado;
                    

select idResultado from Resultados
where Designacao = 'Benfica';

SELECT EventoIdEvento FROM Evento_has_Resultados
JOIN Eventos On Eventos.idEvento = EventoIdEvento
WHERE ResultadoIdResultado = 3 AND Eventos.Estado = 0;

SELECT idEvento FROM Eventos
WHERE Vencedor = 'Benfica';