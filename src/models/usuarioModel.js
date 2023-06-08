var database = require("../database/config");

function cadastro(nickname, dataNasc, pronomes, email, senha){
    console.log("Inserindo novo usuário");
    var command = `
        insert into usuario values
            (null,'${nickname}','${dataNasc}','${pronomes}');
        insert into login values
            (null, '${email}', '${senha}',
                (select idUsuario from usuario
                    where nickname = '${nickname}'));`
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

module.exports = {
    cadastro,
    login,
    selecionar
};