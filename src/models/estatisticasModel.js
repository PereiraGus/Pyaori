var database = require("../database/config");

function maisOuvidas(idUsuario){
    var command = `select * from vwMaisOuvidas where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function pyas(idUsuario){
    var command = `select * from vwPyasUsuario where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function artistasFavoritos(idUsuario){
    var command = `select * from vwArtistasFavoritos where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function paisesFavoritos(idUsuario){
    var command = `select * from vwPaisesFavoritos where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function estilosFavoritos(idUsuario){
    var command = `select * from vwGenerosFavoritos where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function ultimasReproducoes(idUsuario){
    var command = `select * from vwReproducoes where idUsuario = ${idUsuario};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    maisOuvidas,
    pyas,
    artistasFavoritos,
    paisesFavoritos,
    estilosFavoritos,
    ultimasReproducoes
}