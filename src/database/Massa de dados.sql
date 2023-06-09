-- -------------------------------------------------------------------------------------------
-- ------------------------------------- Inserindo usuários ----------------------------------
insert into usuario values
	(null,'PearGuss','2005-06-13','Elu', 8);
insert into login values
	(null, 'gustavo.oito@hotmail.com', 'urubu100', 
	(select idUsuario from usuario where nickname = 'PearGuss'));
    
insert into usuario values
	(null,'Lithitwo','2005-05-22','Ele', 5);
insert into login values
	(null, 'erin2205@gmail.com', 'urubu100',
	(select idUsuario from usuario where nickname = 'Lithitwo'));
    
insert into usuario values
	(null,'coelho de neve','2006-06-13','Ela', 9);
insert into login values
	(null, 'luanaAbdalla@outlook.com', 'urubu100',
	(select idUsuario from usuario where nickname = 'coelho de neve'));
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- ------------------------------------- Inserindo artistas ----------------------------------
insert into artista values(null,'Lady Gaga','us'),
						  (null,'Matuê','br'),
						  (null,'Antônio Carlos Jobim','br'),
						  (null,'Miki Matsubara','jp'),
						  (null,'M.I.A.','br'),
						  (null,'Amy Winehouse','br'),
						  (null,'Mitski','us'),
						  (null,'Iza','br'),
						  (null,'ANAVITÓRIA','br'),
						  (null,'Rita Lee','br'),
						  (null,'Sergio Mendes & Brasil 66','br'),
						  (null,'Frank Sinatra','us'),
						  (null,'Mariya Takeuchi','jp'),
                          (null,'Wiu','br'),
                          (null,'Teto','br'),
                          (null,'T.I.','us'),
                          (null,'Too $hort','us'),
                          (null,'Twista','us');
-- select * from artista;
-- -------------------------------------------------------------------------------------------
-- ------------------------------------- Inserindo albuns ------------------------------------
insert into album values(null,'ARTPOP','Album',2013,1),
						(null,'Flow Espacial','Single',2023,15),
                        (null,'Garota de Ipanema','Single',1962,3),
                        (null,'Miki Matsubara Best Collection','Coleção',1979,4),
                        (null,'Bad Girls','Single',2012,5),
                        (null,'Back to Black','Album',2006,6),
                        (null,'Be the Cowboy','Album',2018,7),
                        (null,'Brisa','Single',2020,8),
                        (null,'Amarelo, Azul e Branco','Single',2021,9),
                        (null,'Erva Venenosa','Single',2000,10),
                        (null,'Mas que Nada','Single',1966,11),
                        (null,'Fly Me to the Moon','Single',1966,12),
                        (null,'PLASTIC LOVE','Single',1964,13);
-- select * from album;
-- -------------------------------------------------------------------------------------------
-- ------------------------------------- Inserindo faixas ------------------------------------
insert into faixa values(null,'Aura','Pop',1,100,1),
						(null,'Venus','Pop',1,100,1),
						(null,'G.U.Y.','Pop',1,100,1),
						(null,'Sexxx Dreams','Pop',1,100,1),
						(null,"Jewels N' Drugs",'Pop',1,100,1),
						(null,'MANiCURE','Pop',1,100,1),
						(null,'ARTPOP','Pop',1,100,1),
						(null,'Swine','Pop',1,100,1),
						(null,'Donatella','Pop',1,100,1),
						(null,'Fashion!','Pop',0,100,1),
						(null,'Mary Jane Holland','Pop',1,100,1),
						(null,'Dope','Pop',1,100,1),
						(null,'Gipsy','Pop',0,100,1),
						(null,'Applause','Pop',0,100,1);
insert into faixa values(null,'Flow Espacial','Rap / Hip-Hop',1,100,2);
insert into faixa values(null,'Garota de Ipanema','Samba / Bossa Nova',0,100,3);
insert into faixa values(null,'Mayonaka no Door / Stay With Me','Pop',0,100,4),
                        (null,'Ai wa Energy','Pop',0,100,4);
insert into faixa values(null,'Bad Girls','Rap / Hip-Hop',0,100,5);
insert into faixa values(null,'Rehab','R&B / Soul',0,100,6),
						(null,"You Know I'm No Good",'R&B / Soul',0,100,6),
						(null,"Me & Mr. Jones",'R&B / Soul',1,100,6),
						(null,"Just Friends",'R&B / Soul',1,100,6),
						(null,"Back to Black",'R&B / Soul',1,100,6),
						(null,"Love Is a Losing Game",'R&B / Soul',0,100,6),
						(null,"Tears Dry on their Own",'R&B / Soul',1,100,6),
						(null,"Wake Up Alone",'R&B / Soul',0,100,6),
						(null,"Some Unholy War",'R&B / Soul',0,100,6),
						(null,"He Can Only Hold Her",'R&B / Soul',0,100,6),
						(null,"Addicted",'R&B / Soul',0,100,6);
insert into faixa values(null,'A Pearl','Indie / Alternativa',0,100,7),
						(null,'Nobody','Pop',0,100,7),
                        (null,'Washing Machine Heart','Rock',0,100,7);
insert into faixa values(null,'Brisa','Reggae',0,100,8);
insert into faixa values(null,'Amarelo, Azul e Branco','Folk',0,100,9);
insert into faixa values(null,'Erva Venenosa','Rock',0,100,10);
insert into faixa values(null,'Mas que nada','Samba / Bossa Nova',0,100,11);
insert into faixa values(null,'Fly Me to the Moon','Jazz',0,100,12);
insert into faixa values(null,'PLASTIC LOVE','Pop',0,100,13);
insert into faixa values(null,'Valerie - Live At BBC Radio 1','Jazz',0,100,6);
select * from faixa;
SELECT * from artista;
-- -------------------------------------------------------------------------------------------
-- ------------------------------- Ligando faixas e artistas ---------------------------------
insert into faixaArtista values(1,1,'P'),
							   (2,1,'P'),
							   (3,1,'P'),
							   (4,1,'P'),
							   (5,1,'P'),
							   (5,16,'C'),
							   (5,17,'C'),
							   (6,1,'P'),
							   (7,1,'P'),
							   (8,1,'P'),
							   (9,1,'P'),
							   (10,1,'P'),
							   (11,1,'P'),
							   (12,1,'P'),
							   (13,1,'P'),
							   (14,1,'P'),
							   (15,2,'P'), --
							   (15,14,'C'),
							   (15,15,'C'),
							   (16,3,'P'), --
							   (17,4,'P'), --
							   (18,4,'P'),
							   (19,5,'P'), --
							   (20,6,'P'), --
							   (21,6,'P'),
							   (22,6,'P'),
							   (23,6,'P'),
							   (24,6,'P'),
							   (25,6,'P'),
							   (26,6,'P'),
							   (27,6,'P'),
							   (28,6,'P'),
							   (29,6,'P'),
							   (30,6,'P'),
							   (31,7,'P'), --
							   (32,7,'P'),
							   (33,7,'P'),
							   (34,8,'P'), --
							   (35,9,'P'), --
							   (35,10,'C'), 
							   (36,10,'P'), --
							   (37,11,'P'), --
							   (38,12,'P'), --
							   (39,13,'P'), --
							   (40,6,'P'); --
-- select * from faixaArtista;