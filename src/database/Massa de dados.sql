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
						  (null,'M.I.A.','us'),
						  (null,'Amy Winehouse','us'),
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
insert into faixa values(null,'Aura','Pop',1,1),
						(null,'Venus','Pop',1,1),
						(null,'G.U.Y.','Pop',1,1),
						(null,'Sexxx Dreams','Pop',1,1),
						(null,"Jewels N' Drugs",'Pop',1,1),
						(null,'MANiCURE','Pop',1,1),
						(null,'ARTPOP','Pop',1,1),
						(null,'Swine','Pop',1,1),
						(null,'Donatella','Pop',1,1),
						(null,'Fashion!','Pop',0,1),
						(null,'Mary Jane Holland','Pop',1,1),
						(null,'Dope','Pop',1,1),
						(null,'Gipsy','Pop',0,1),
						(null,'Applause','Pop',0,1);
insert into faixa values(null,'Flow Espacial','Rap / Hip-Hop',1,2);
insert into faixa values(null,'Garota de Ipanema','Samba / Bossa Nova',0,3);
insert into faixa values(null,'Mayonaka no Door / Stay With Me','Pop',0,4),
                        (null,'Ai wa Energy','Pop',0,4);
insert into faixa values(null,'Bad Girls','Rap / Hip-Hop',0,5);
insert into faixa values(null,'Rehab','R&B / Soul',0,6),
						(null,"You Know I'm No Good",'R&B / Soul',0,6),
						(null,"Me & Mr. Jones",'R&B / Soul',1,6),
						(null,"Just Friends",'R&B / Soul',1,6),
						(null,"Back to Black",'R&B / Soul',1,6),
						(null,"Love Is a Losing Game",'R&B / Soul',0,6),
						(null,"Tears Dry on their Own",'R&B / Soul',1,6),
						(null,"Wake Up Alone",'R&B / Soul',0,6),
						(null,"Some Unholy War",'R&B / Soul',0,6),
						(null,"He Can Only Hold Her",'R&B / Soul',0,6),
						(null,"Addicted",'R&B / Soul',0,6);
insert into faixa values(null,'A Pearl','Indie / Alternativa',0,7),
						(null,'Nobody','Pop',0,7),
                        (null,'Washing Machine Heart','Rock',0,7);
insert into faixa values(null,'Brisa','Reggae',0,8);
insert into faixa values(null,'Amarelo, Azul e Branco','Folk',0,9);
insert into faixa values(null,'Erva Venenosa','Rock',0,10);
insert into faixa values(null,'Mas que nada','Samba / Bossa Nova',0,11);
insert into faixa values(null,'Fly Me to the Moon','Jazz',0,12);
insert into faixa values(null,'PLASTIC LOVE','Pop',0,13);
insert into faixa values(null,'Valerie - Live At BBC Radio 1','Jazz',0,6);
-- select * from faixa;
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
-- -------------------------------------------------------------------------------------------
-- ------------------------------- Inserindo pyas --------------------------------------------
insert into pya values(null,'Alegre','1'),
					  (null,'Depressivo','0'),
					  (null,'Raivoso','N'),
					  (null,'Empoderador','1'),
					  (null,'Calmo','1'),
					  (null,'Animado','1'),
					  (null,'Assustador / Misterioso','N'),
					  (null,'Apaixonado','1'),
					  (null,'Sensual','N'),
					  (null,'Acústico / Confortável','1'),
					  (null,'Épico','N'),
					  (null,'Nostálgico','1'),
					  (null,'Transcendente','1'),
                      (null,'Divertido','1'),
                      (null,'Rave / Balada','N'),
                      (null,'Excêntrico','N');
-- select * from pya;
-- -------------------------------------------------------------------------------------------
-- ---------------------------- Ligando pyas e músicas ---------------------------------------
insert into pyafaixa values(1,6),
						   (1,8),
						   (1,9),
						   (1,15),
						   (1,16),
						   (2,7),
						   (2,8),
						   (2,13),
						   (2,15),
						   (2,16),
						   (3,4),
						   (3,9),
						   (3,13),
						   (3,16),
						   (4,6),
						   (4,8),
						   (4,9),
						   (4,14),
						   (6,3),
						   (6,4),
						   (6,6),
						   (6,9),
						   (7,5),
						   (7,8),
						   (7,13),
						   (7,16),
						   (8,3),
						   (8,4),
						   (8,9),
						   (9,4),
						   (9,9),
						   (10,1),
						   (10,4),
						   (10,5),
						   (10,10),
						   (11,6),
						   (11,14),
						   (11,15),
						   (12,2),
						   (13,6),
						   (13,8),
						   (13,14),
						   (13,15),
						   (14,4),
						   (14,6),
						   (14,11),
						   (14,14),
						   (15,4),
						   (15,10),
						   (16,1),
						   (16,5),
						   (16,10),
						   (17,2),
						   (17,8),
						   (17,10),
						   (17,12),
						   (18,1),
						   (18,12),
						   (19,4),
						   (19,11),
						   (19,15),
						   (20,1),
						   (20,10),
						   (20,14),
						   (20,16),
						   (21,2),
						   (22,2),
						   (22,3),
						   (22,10),
						   (22,12),
						   (23,2),
						   (23,5),
						   (23,8),
						   (24,2),
						   (25,2),
						   (25,5),
						   (25,10),
						   (26,2),
						   (26,12), -- -----------------------
						   (31,2),
						   (31,3),
						   (31,7),
						   (31,11),
						   (32,2),
						   (32,5),
						   (32,14),
						   (33,2),
						   (33,7),
						   (34,1),
						   (34,6),
						   (34,10),
						   (34,14),
						   (35,1),
						   (35,4),
						   (35,10),
						   (35,11),
                           (36,1), -- ---------------
                           (37,1),
                           (37,5),
                           (37,10),
                           (37,12),
                           (38,1),
                           (38,5),
                           (38,8),
                           (38,10),
                           (38,12),
                           (39,2),
                           (39,12),
                           (40,5),
                           (40,8),
                           (40,10);
-- select * from pyafaixa;