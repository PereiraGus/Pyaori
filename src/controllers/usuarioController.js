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
                    res.status(409).json("nickname");
                }
                if((error.sqlMessage).indexOf("email") != -1){
                    console.log("Email duplicado");
                    res.status(409).json("nickname");
                }
            }
            else{
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                console.log.json(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
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
                res.json(result);
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
    console.log("Na controller");
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

module.exports = {
    cadastro,
    login,
    selecionar
}