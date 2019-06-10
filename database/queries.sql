##### SELECTS #####

select * from Utilizadors;

select * from Categoria;

select * from Resultados;

select * from Eventos;

select * from Evento_has_Resultados;


##### INSERTS #####

insert into Utilizadors (id, Email, Password, Nome, Tipo, EssCoins, ValorPago, isPremium)
	values 
    (1, 'miguel@gmail.com', 'miguel', 'Miguel', 'A', 200, 50, 1);

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
	
insert into Eventos (idEvento, Estado, DiaHora, idCategoria)
	values
		(1, 1, '2019-05-01 21:30:05', 1),
		(2, 1, '2019-05-01 13:30:05', 1);
        
insert into Evento_has_Resultados (EventoIdEvento, ResultadoIdResultado, Odd)
	values
		(1, 1, 2.4),
		(2, 1, 3.7),
        (2, 2, 5.6),
        (1, 3, 5.6);


##### QUERIES #####
    
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
