var database = require("../database/config");

function cadastro(nickname, dataNasc, pronomes, email, senha){
    console.log("Inserindo novo usuário");
    var command = `call spUsuario('${nickname}', '${dataNasc}', '${pronomes}', '${email}', '${senha}');`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function login(email, senha){
    console.log("Usuário logando");
    var command = `
        select * from vwUsuario
            where email = '${email}' and senha = '${senha}';
    `;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function selecionar(idUsuario){
    console.log("Selecionando as infos. de um usuário")
    var command = `
        select * from vwUsuario
            where idUsuario = ${idUsuario}`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function atualizar(idUsuario, nickname, pronomes, email){
    console.log("Atualizando as infos. de um usuário")
    var command = `
        call spUpdateUsuario(${idUsuario}, '${nickname}', '${pronomes}', '${email}');`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function trocarAvatar(idUsuario, avatar){
    console.log("Trocando o avatar de um usuário");
    var command = `
        update usuario set avatar = ${avatar} where idUsuario = ${idUsuario};`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function trocarSenha(idUsuario, senhaAntiga, senhaNova){
    console.log("Trocando a senha de um usuário");
    var command = `
        update login set senha = '${senhaNova}' where idUsuario = ${idUsuario} and senha = '${senhaAntiga}';`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    cadastro,
    login,
    selecionar,
    atualizar,
    trocarAvatar,
    trocarSenha
};