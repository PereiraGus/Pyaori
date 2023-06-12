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
    var command = `select * from vwDiscografia where idArtista = ${idArtista};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    selecionarAlbum,
    selecionarArtistasMusica,
    selecionarDiscografiaArtista
};