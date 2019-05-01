##### SELECTS #####

select * from Categoria;

select * from Resultados;

select * from Odds;

select * from Resultado_has_Odds;

select * from Eventos;

select * from Evento_has_Resultados;



##### INSERTS #####

insert into Categoria (idCategoria, Designacao)
	values
		(1, 'Futebol'),
        (2, 'Basquetebol'),
        (3, 'Hóquei'),
        (4, 'Andebol'),
        (5, 'Rugby');

insert into Resultados (idResultado, Designacao)
	values
		(1, 'Desportivo das Aves'),
        (2, 'Benfica'),
        (3, 'Porto');
        
insert into Odds (idOdd, Valor)
	values
		(1, 2.4),
        (2, 4.7),
        (3, 5.6),
        (4, 1.9),
        (5, 3.7);

insert into Resultado_has_Odds (EventoIdEvento, OddidOdd, ResultadoidResultado)
	values
		(2, 5, 1),
        (2, 3, 3);
        
insert into Eventos (idEvento, Estado, DiaHora, idCategoria)
	values
		(2, -1, '2019-05-01 13:30:05', 1);
        
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado)
	values
		(2, 1),
        (2, 2);


##### QUERIES #####

# Seleciona toda as Odds de uma determinada equipa.
SELECT Odds.Valor FROM Odds
	JOIN Resultado_has_Odds ON Resultado_has_Odds.OddIdOdd = Odds.idOdd
	WHERE Resultado_has_Odds.ResultadoIdResultado = 1;
    
# Seleciona todas as equipas de um determinado evento.
SELECT Resultados.Designacao FROM Resultados
	JOIN Evento_has_Resultados ON Evento_has_Resultados.ResultadoIdResultado = Resultados.idResultado
    WHERE Evento_has_Resultados.EventoIdEvento = 1;

# Seleciona para cada Resultado a sua respetiva Odd de um determinado Evento.
SELECT Resultados.Designacao, Odds.Valor FROM Resultados
	JOIN Resultado_has_Odds ON Resultado_has_Odds.ResultadoIdResultado = Resultados.idResultado
    JOIN Odds ON Odds.idOdd = Resultado_has_Odds.OddIdOdd
    WHERE Resultados.idResultado = 1;
    
    
    
select * from Eventos where idEvento = 1;

select ResultadoIdResultado from Evento_has_Resultados
	where EventoIdEvento = 1;
    
    
select Resultados.Designacao, Odds.Valor
from Resultados
join Resultado_has_Odds ON (Resultado_has_Odds.ResultadoIdResultado = Resultados.idResultado AND Resultado_has_Odds.EventoIdEvento = 1)
join Odds ON Odds.idOdd = Resultado_has_Odds.OddIdOdd
where Resultados.idResultado = 3;

select Eventos.*, Categoria.Designacao, Resultados.Designacao, Odds.Valor
from Eventos
join Categoria ON Categoria.idCategoria = Eventos.idCategoria
join Evento_has_Resultados ON Evento_has_Resultados.EventoIdEvento = Eventos.idEvento
join Resultados ON Resultados.idResultado = Evento_has_Resultados.ResultadoIdResultado
join Resultado_has_Odds ON (Resultado_has_Odds.ResultadoIdResultado = Resultados.idResultado AND Resultado_has_Odds.EventoIdEvento = Eventos.idEvento)
join Odds ON Odds.idOdd = Resultado_has_Odds.OddIdOdd
where Eventos.idEvento = 2;







    

    
