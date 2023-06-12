var database = require("../database/config");

function nacionalidades(anoMin, anoMax){
    console.log("Explorar passo 1 - ano de laçamento e nacionalidade");
    var command = `select distinct nacionalidade as opcao
    from artista as art
    join album as alb on art.idArtista = alb.idArtista
    where (anoLanc between ${anoMin} and ${anoMax}) and (alb.idAlbum not in(select idAlbum from avaliacao))`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function generos(anoMin, anoMax, nacionalidade){
    console.log("Explorar passo 2 - estilo musical");
    var command = `
    select distinct genero as opcao
    from faixa as fx
    join faixaartista as fa on fx.idFaixa = fa.idFaixa
    join artista as art on art.idArtista = fa.idArtista
	join album as alb on fx.idAlbum = alb.idAlbum
    where (anoLanc between ${anoMin} and ${anoMax}) and (nacionalidade like '${nacionalidade}') and (alb.idAlbum not in(select idAlbum from avaliacao));`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function pyas(anoMin, anoMax, nacionalidade, genero){
    console.log("Explorar passo 3 - pya");
    var command = `
    select distinct p.nome as opcao
    from pya as p
    join pyafaixa as pf on p.idPya = pf.idPya
    join faixa as fx on pf.idFaixa = fx.idFaixa
    join faixaartista as fa on fx.idFaixa = fa.idFaixa
    join artista as art on art.idArtista = fa.idArtista
	join album as alb on fx.idAlbum = alb.idAlbum
    where (anoLanc between ${anoMin} and ${anoMax}) and (nacionalidade like '${nacionalidade}') and (genero like '${genero}') and (alb.idAlbum not in(select idAlbum from avaliacao));`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function resultados(anoMin, anoMax, nacionalidade, genero, pya, idUsuario){
    console.log("Explorar passo 4 - resultados");
    var command = `
    select distinct alb.*, art.nome as artista
    from album as alb
    join faixa as fx on alb.idAlbum = fx.idAlbum
    join pyafaixa as pf on fx.idFaixa = pf.idFaixa
    join pya as p on p.idPya = pf.idPya
    join faixaartista as fa on fx.idFaixa = fa.idFaixa
    join artista as art on art.idArtista = alb.idArtista
    where (anoLanc between ${anoMin} and ${anoMax}) and (nacionalidade like '${nacionalidade}') and (genero like '${genero}') and (p.nome like '${pya}') and (alb.idAlbum not in(select idAlbum from avaliacao where idUsuario = ${idUsuario}))
    order by rand();`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    nacionalidades,
    generos,
    pyas,
    resultados
};