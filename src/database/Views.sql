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
select * from vwMusica where idAlbum = 1;
----------------------------------------------*/
-- --------------------------------------------
-- Selecionar os artistas de uma determinada faixa
create or replace view vwFaixaArtista as
	select f.idFaixa, f.titulo, a.idArtista, a.nome, fa.principalOuConvidado as principalOuConvidado
    from faixa as f
    join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as a on fa.idArtista = a.idArtista
    order by f.idFaixa;
/*
select * from vwFaixaArtista where idFaixa = 5;
----------------------------------------------*/
-- Selecionar os álbuns avaliados de um determinado usuário
select alb.*, art.nome as artista, av.salvoOuDispensado as salvoOuDispensado
    from album as alb
	join artista as art on alb.idArtista = art.idArtista
    join avaliacao as av on av.idAlbum = alb.idAlbum
    where idUsuario = 1;
-- --------------------------------------------
-- ------- Ver as 10 faixas mais ouvidas -------
create or replace view vwMaisOuvidas as
select u.idUsuario, art.nome as artista, f.titulo, a.idAlbum, count(r.idFaixa) as reproducoes from reproducao as r
	   join faixa as f on r.idFaixa = f.idFaixa
       join usuario as u on r.idUsuario = u.idUsuario
       join album as a on a.idAlbum = f.idAlbum
       join artista as art on a.idArtista = art.idArtista
       group by u.idUsuario, f.idFaixa
	   order by reproducoes desc
       limit 10;
/*
select * from vwMaisOuvidas where idUsuario = 1;
----------------------------------------------*/
-- Ver os Pyas mais influentes em determinado usuário
create or replace view vwPyasUsuario as
select u.idUsuario, p.nome, count(r.idFaixa) as vezes from reproducao as r
	join faixa as f on f.idFaixa = r.idFaixa
    join pyafaixa as pf on f.idFaixa = pf.idFaixa
    join pya as p on pf.idPya = p.idPya
    join usuario as u on r.idUsuario = u.idUsuario
    group by u.idUsuario, p.nome
	order by vezes desc
	limit 10;
/*
select * from vwPyasUsuario where idUsuario = 1;
----------------------------------------------*/
-- Ver os artistas favoritos de um determinado usuário
create or replace view vwArtistasFavoritos as
select u.idUsuario, a.nome, count(r.idFaixa) as vezes from reproducao as r
	join faixa as f on f.idFaixa = r.idFaixa
    join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as a on a.idArtista = fa.idArtista
    join usuario as u on r.idUsuario = u.idUsuario
    group by u.idUsuario, a.nome
	order by vezes desc
	limit 10;
/*
select * from vwArtistasFavoritos where idUsuario = 1;
----------------------------------------------*/
-- Ver os países favoritos de um determinado usuário
create or replace view vwPaisesFavoritos as
select u.idUsuario, a.nacionalidade, count(r.idFaixa) as vezes from reproducao as r
	join faixa as f on f.idFaixa = r.idFaixa
    join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as a on a.idArtista = fa.idArtista
    join usuario as u on r.idUsuario = u.idUsuario
    group by u.idUsuario, a.nacionalidade
	order by vezes desc
	limit 10;
/*
select * from vwPaisesFavoritos where idUsuario = 1;
----------------------------------------------*/
-- Ver os gêneros musicais favoritos de um determinado usuário
create or replace view vwGenerosFavoritos as
select u.idUsuario, f.genero, count(r.idFaixa) as vezes from reproducao as r
	join faixa as f on f.idFaixa = r.idFaixa
    join usuario as u on r.idUsuario = u.idUsuario
    group by u.idUsuario, f.genero
	order by vezes desc
	limit 10;
/*
select * from vwGenerosFavoritos where idUsuario = 1;
----------------------------------------------*/
-- Ver últimas reproduções de um determinado usuário
create or replace view vwReproducoes as
select
	u.idUsuario,
	DATE_FORMAT(r.dataHora,'%d/%m') as diaMes,
	count(r.idFaixa) as vezes from reproducao as r
    join usuario as u on r.idUsuario = u.idUsuario
    group by u.idUsuario, diaMes
    order by vezes asc
	limit 10;
/*
select * from vwReproducoes where idUsuario = 1;
----------------------------------------------*/
select art.idArtista, nome, nacionalidade, gen.genero as generoPrinc, idAlbum, titulo, anoLanc from artista as art
	left join album as alb on art.idArtista = alb.idArtista
	join(select idArtista, genero, count(f.idFaixa) as vezes from faixa as f
			join faixaartista as fa on f.idFaixa = fa.idFaixa
            where idArtista = 6
            group by idArtista, genero order by vezes desc limit 1) as gen on gen.idArtista = art.idArtista;
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
-- --------------------------------------------
-- Recomendar álbuns para um determinado usuário baseado em seus gostos
DELIMITER $$
create procedure spRecomendar(
	pidUsuario int
)
begin
select distinct alb.idAlbum, alb.titulo, art.nome 
	from album as alb
	join artista as art on art.idArtista = alb.idArtista
    join faixa as f on f.idAlbum = alb.idAlbum
    where(
		genero in(select distinct genero from faixa as f
						join album as alb on f.idAlbum = alb.idAlbum
						join avaliacao as av on f.idFaixa = alb.idAlbum
                        where idUsuario = pidUsuario)
		or art.nome in(select distinct art.nome from artista as art
						join album as alb on alb.idArtista = art.idArtista
						join avaliacao as av on av.idAlbum = alb.idAlbum
						where idUsuario = pidUsuario)
		or art.nacionalidade in(select distinct art.nacionalidade from artista as art
						join album as alb on alb.idArtista = art.idArtista
						join avaliacao as av on av.idAlbum = alb.idAlbum
						where idUsuario = pidUsuario)
		)
        and alb.idAlbum not in (select idAlbum from avaliacao where idUsuario = pidUsuario
        )
	order by rand() limit 5;
end;
$$/*
call spRecomendar(1);
*/