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

function carregarAvaliados(idUsuario, salvoOuDispensado){
    console.log("Carregando os itens avaliados de um usuário");
    var command = `select alb.*, art.nome as artista, av.salvoOuDispensado as salvoOuDispensado
    from album as alb
	join artista as art on alb.idArtista = art.idArtista
    join avaliacao as av on av.idAlbum = alb.idAlbum
    where idUsuario = ${idUsuario} and salvoOuDispensado = '${salvoOuDispensado}';`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function gerarRecomendacoes(idUsuario){
    console.log("Gerando as recomendações de um usuário");
    var command = `call spRecomendar(${idUsuario});`
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    cadastro,
    login,
    selecionar,
    atualizar,
    trocarAvatar,
    trocarSenha,
    carregarAvaliados,
    gerarRecomendacoes
};