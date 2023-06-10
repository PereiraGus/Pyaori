const { json } = require("express");
var musicalModel = require("../models/musicaModel");

function cadastro(nickname, dataNasc, pronomes, email, senha){
    console.log("Inserindo novo usuário");
    var command = `call spUsuario('${nickname}', '${dataNasc}', '${pronomes}', '${email}', '${senha}');`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function explorarAlbum(epoca, pais, estilo, pya){
    console.log("Explorando albums");
    var command = `select * from vwAlbum where nacionalidade = ${pais} and `
}

module.exports = {

};