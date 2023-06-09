-- --------------------------------------------
-- Inserir usuário e login juntos
DELIMITER $$
create procedure spUsuario(
	pNickname varchar(15),
    pDataNasc date,
    pPronomes char(3),
    pEmail varchar(60),
    pSenha varchar(15))
begin
	insert into usuario values(null, pNickname, pDataNasc, pPronomes, default);
    insert into login values(null, pEmail, pSenha, (select idUsuario from usuario where nickname = pNickname));
end
$$
/*
call spUsuario('lobiClara', '2007-09-12', 'Ela', 'lobi@gmail.com', 'urubu100');
----------------------------------------------*/
-- --------------------------------------------
-- Atualizar usuário e login juntos -- PARA ALTERAR AVATAR OU SENHA, EXISTEM PARTES SEPARADAS NO SISTEMA.
DELIMITER $$						-- DATA DE NASCIMENTO SÓ PODE SER ALTERADA POR UM ADMINISTRADOR.
create procedure spUpdateUsuario(
	pIdUsuario int,
	pNickname varchar(15),
    pPronomes char(3),
    pEmail varchar(60))
begin
	update usuario set nickname = pNickname, pronomes = pPronomes where idUsuario = pIdUsuario;
    update login set email = pEmail where idUsuario = pIdUsuario;
end;
$$
/*
call spUpdateUsuario(1, 'gusPear', 'Ele', 'gus.pereira.castro@gmail.com');
----------------------------------------------*/
-- --------------------------------------------
-- Selecionar usuários com seu respectivo login
create or replace view vwUsuario as
	select u.*, email, senha from usuario as u
    join login as l on u.idUsuario = l.idUsuario;
/*
select * from vwUsuario;
select * from vwUsuario where idUsuario = 1;
select * from vwUsuario where email = 'gustavo.oito@hotmail.com' and senha = 'urubu100';
----------------------------------------------*/