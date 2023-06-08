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
	insert into usuario values(null, pNickname, pDataNasc, pPronomes);
    insert into login values(null, pEmail, pSenha, (select idUsuario from usuario where nickname = pNickname));
end
$$
/*
call spUsuario('lobiClara', '2007-09-12', 'Ela', 'lobi@gmail.com', 'urubu100');
----------------------------------------------*/
-- --------------------------------------------
-- Selecionar usuários com seu respectivo login
create or replace view vwUsuario as
	select u.*, email, senha from usuario as u
    join login as l on u.idUsuario = l.idUsuario;
/*
select * from vwUsuario where idUsuario = 1;
select * from vwUsuario where email = 'gustavo.oito@hotmail.com' and senha = 'urubu100';
----------------------------------------------*/