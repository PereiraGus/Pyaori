const { json } = require("express");
var usuarioModel = require("../models/usuarioModel");

function cadastro(req, res){
    let nickname = req.body.sNickname;
    let dataNasc = req.body.sDataNasc;
    let pronomes = req.body.sPronomes;
    let email = req.body.sEmail;
    let senha = req.body.sSenha;

    usuarioModel.cadastro(nickname, dataNasc, pronomes, email, senha)
        .then(function (result){
                res.json(result);
            }
        ).catch(function (error){
            console.log(error.sqlState);
            if(error.sqlState == 23000){
                if((error.sqlMessage).indexOf("nickname") != -1){
                    console.log("Nickname duplicado");
                    res.status(409).json("Nome de usuário");
                }
                if((error.sqlMessage).indexOf("email") != -1){
                    console.log("Email duplicado");
                    res.status(409).json("Email");
                }
            }
            else if(error.sqlState == 42000){
                res.status(400);
            }
            else{
                console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
                console.log(error.sqlState);
                res.status(500).json(error.sqlMessage);
            }
        });
}

function login(req, res){
    let email = req.body.sEmail;
    let senha = req.body.sSenha;

    usuarioModel.login(email, senha)
        .then(function (result){
            if(result.length == 1){
                console.log(result);
                res.json(result[0]);
            }
            else{
                res.status(404).send("Email ou senha inválidos.");
            }
        })
        .catch(function (error){
            console.log(error);
            console.log(`Erro ao logar:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function selecionar(req, res){
    let idUsuario = req.params.idUsuario;

    usuarioModel.selecionar(idUsuario)
        .then(function (result){
            if(result.length == 1){
                console.log(result);
                res.json(result);
            }
            else{
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error){
            console.log(error);
            console.log(`Erro ao selecionar usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function atualizar(req, res){
    let idUsuario = req.params.idUsuario;
    let nickname = req.body.sNickname;
    let pronomes = req.body.sPronomes;
    let email = req.body.sEmail;

    usuarioModel.atualizar(idUsuario, nickname, pronomes, email)
        .then(function (result){
            console.log(result);
            res.json(result);
        })
        .catch(function (error){
            console.log(error.sqlState);
            if(error.sqlState == 23000){
                if((error.sqlMessage).indexOf("nickname") != -1){
                    console.log("Nickname duplicado");
                    res.status(409).json("Nome de usuário");
                }
                if((error.sqlMessage).indexOf("email") != -1){
                    console.log("Email duplicado");
                    res.status(409).json("Email");
                }
            }
            else if(error.sqlState == 42000){
                res.status(400);
            }
            else{
                console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
                console.log(error.sqlState);
                res.status(500).json(error.sqlMessage);
            }
        });
}

function trocarAvatar(req, res){
    let idUsuario = req.params.idUsuario;
    let avatar = req.body.sAvatar;

    if(Number(avatar) < 1 || Number(avatar) > 12){
        res.status(404).json("Avatar inválido");
    }

    usuarioModel.trocarAvatar(idUsuario, avatar)
        .then(function (result){
            console.log(result);
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            console.log(error.sqlState);
            res.status(500).json(error.sqlMessage);
        });
}

function trocarSenha(req, res){
    let idUsuario = req.params.idUsuario;
    let senhaAntiga = req.body.senhaAntiga;
    let senhaNova = req.body.senhaNova

    usuarioModel.trocarSenha(idUsuario, senhaAntiga, senhaNova  )
        .then(function (result){
            if(result.affectedRows != 1){//Verifica se algum registro foi alterado, ou seja, a senha antiga confere
                res.status(400).json("Senha errada"); //Se não, é erro 400
            }
            else{
                console.log(result);
                res.json(result);
            }
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            console.log(error.sqlState);
            res.status(500).json(error.sqlMessage);
        });
}

function carregarSalvos(req, res){
    let idUsuario = req.params.idUsuario;
    let salvoOuDispensado = req.params.salvoOuDispensado;

    usuarioModel.carregarAvaliados(idUsuario, salvoOuDispensado)
        .then(function (result){
            if(result.length > 0){
                console.log(result);
                res.json(result);
            }
            else{
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error){
            console.log(error);
            console.log(`Erro ao carregar salvos de um usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function gerarRecomendacoes(req, res){
    let idUsuario = req.params.idUsuario;

    usuarioModel.gerarRecomendacoes(idUsuario)
        .then(function (result){
            if(result[0].length > 0){
                console.log(result);
                res.json(result[0]);
            }
            else{
                res.status(404).send("Não foi possível gerar recomendações");
            }
        })
        .catch(function (error){
            console.log(error);
            console.log(`Erro ao gerar as recomendações de um usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}


module.exports = {
    cadastro,
    login,
    selecionar,
    atualizar,
    trocarAvatar,
    trocarSenha,
    carregarSalvos,
    gerarRecomendacoes
}