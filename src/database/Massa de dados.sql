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
