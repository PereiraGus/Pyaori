-- --------------------------------------------
-- Selecionar usuários com seu respectivo login
create or replace view vwUsuario as
	select u.*, email, senha from usuario as u
    join login as l on u.idUsuario = l.idUsuario;

select * from vwUsuario where email = 'gustavo.oito@hotmail.com' and senha = 'urubu100';
-- --------------------------------------------