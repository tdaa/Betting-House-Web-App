##### SELECTS #####

select * from Categoria;

select * from Resultados;

select * from Odds;

select * from Resultado_has_Odds;



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

insert into Resultado_has_Odds (OddidOdd, ResultadoidResultado)
	values
		(1, 1),
        (4, 1),
        (2, 2),
        (3, 3);



##### QUERIES #####

# Seleciona toda as Odds de uma determinada equipa.
SELECT Odds.Valor FROM Odds
	JOIN Resultado_has_Odds ON Resultado_has_Odds.OddIdOdd = Odds.idOdd
	WHERE Resultado_has_Odds.ResultadoIdResultado = 1;