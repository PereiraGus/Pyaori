var database = require("../database/config");

function selecionarAlbum(idAlbum){
    console.log("Carregando as informações de um album");
    var command = `select * from vwAlbum as a
    join vwMusica as m on a.idAlbum = m.idAlbum
    where a.idAlbum = ${idAlbum};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function selecionarArtistasMusica(idFaixa){
    console.log("Carregando os artistas de uma música");
    var command = `select * from vwFaixaArtista where idFaixa = ${idFaixa};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function selecionarDiscografiaArtista(idArtista){
    console.log("Carregando a discografia de um artista");
    var command = `select art.idArtista, nome, nacionalidade, gen.genero as generoPrinc, idAlbum, titulo, anoLanc from artista as art
	left join album as alb on art.idArtista = alb.idArtista
	join(select idArtista, genero, count(f.idFaixa) as vezes from faixa as f
			join faixaartista as fa on f.idFaixa = fa.idFaixa
            where idArtista = ${idArtista}
            group by idArtista, genero order by vezes desc limit 1) as gen on gen.idArtista = art.idArtista;`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function proximaAleatoria(idArtista){
    console.log("Carregando a discografia de um artista");
    var command = `select art.idArtista, nome, nacionalidade, gen.genero as generoPrinc, idAlbum, titulo, anoLanc from artista as art
	left join album as alb on art.idArtista = alb.idArtista
	join(select idArtista, genero, count(f.idFaixa) as vezes from faixa as f
			join faixaartista as fa on f.idFaixa = fa.idFaixa
            where idArtista = ${idArtista}
            group by idArtista, genero order by vezes desc limit 1) as gen on gen.idArtista = art.idArtista;`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    selecionarAlbum,
    selecionarArtistasMusica,
    selecionarDiscografiaArtista
};