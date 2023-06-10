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
-- --------------------------------------------
-- Selecionar albuns e seus artistas
create or replace view vwAlbum as
	select alb.*,
    count(fx.idFaixa) as numFaixas,
    art.nome, art.nacionalidade from album as alb
    join artista as art on alb.idArtista = art.idArtista
    join faixaartista as fa on fa.idArtista = alb.idArtista
    join faixa as fx on fa.idFaixa = fx.idFaixa
    group by alb.idAlbum;
/*
select * from vwAlbum;
select * from vwAlbum where idAlbum = 1;
----------------------------------------------*/
-- --------------------------------------------
-- Selecionar faixas de um album
create or replace view vwMusica as
	select f.*, a.titulo as album from faixa as f
    join album as a on f.idAlbum = a.idAlbum;
/*
select * from vwFaixas where idAlbum = 1;
----------------------------------------------*/
-- --------------------------------------------
-- Selecionar os artistas de uma determinada faixa
create or replace view vwFaixaArtista as
	select f.idFaixa, f.titulo, a.nome from faixa as f
    join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as a on fa.idArtista = a.idArtista
    order by f.idFaixa;
/*
select * from vwFaixaArtista where idFaixa = 5;
----------------------------------------------*/
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
end;
$$
/*
call spUsuario('lobiClara', '2007-09-12', 'Ela', 'lobi@gmail.com', 'urubu100');
----------------------------------------------*/
-- --------------------------------------------
-- Atualizar usuário e login juntos -- PARA ALTERAR AVATAR OU SENHA, EXISTEM PARTES SEPARADAS NO SISTEMA.
									-- DATA DE NASCIMENTO SÓ PODE SER ALTERADA POR UM ADMINISTRADOR.
DELIMITER $$
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