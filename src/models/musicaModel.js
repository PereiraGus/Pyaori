var database = require("../database/config");

function cadastro(nickname, dataNasc, pronomes, email, senha){
    console.log("Inserindo novo usuário");
    var command = `call spUsuario('${nickname}', '${dataNasc}', '${pronomes}', '${email}', '${senha}');`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {

};