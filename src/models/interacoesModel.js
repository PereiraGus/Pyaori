var database = require("../database/config");

function salvarOuDispensar(idUsuario, idAlbum, salvarDispensar){
    console.log("Usuário salvando uma música");
    var command = `insert into avaliacao values(${idUsuario},${idAlbum},'${salvarDispensar}');`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function marcarReproducao(idUsuario, idFaixa){
    console.log("Usuário reproduzindo uma música");
    var command = `insert into reproducao values(${idUsuario},${idFaixa},now());`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    salvarOuDispensar,
    marcarReproducao
}