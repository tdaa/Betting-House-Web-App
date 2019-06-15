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
		(4, 1, '2021-05-01 21:30:05', 1);
        
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado, Odd)
	values
		(4, 1, 5.0),
		(4, 3, 3.7),
		(4, 4, 2.1);
        
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado, Odd)
	values
		(1, 1, 1.5),
		(1, 2, 2.4),
		(1, 4, 5.6),
        (2, 1, 1.4),
		(2, 2, 3.7),
        (2, 3, 5.6);

SELECT idEvento, Vencedor, idResultado_Apostado FROM Aposta
            JOIN Evento_in_Aposta ON ApostumIdAposta = idAposta
            JOIN Eventos ON idEvento = EventoIdEvento
            WHERE idAposta = 1;
        
        
select EventoIdEvento, Odd, Designacao
from Evento_has_Resultados
join Resultados ON idResultado = ResultadoIdResultado
where EventoIdEvento = 1 AND ResultadoIdResultado = 1;

##### QUERIES #####

# Apaga o registo de uma Utilizador.
DELETE FROM `Utilizadors` WHERE `id` = 1;

# Apaga o registo de uma Aposta.
DELETE FROM `Aposta` WHERE `idAposta` = 5;

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
