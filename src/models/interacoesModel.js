var database = require("../database/config");

function salvarOuDispensar(idUsuario, idAlbum, salvarDispensar){
    console.log("Usuário salvando uma música");
    var command = `insert into avaliacao values(${idUsuario},${idAlbum},'${salvarDispensar}');`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    salvarOuDispensar
}