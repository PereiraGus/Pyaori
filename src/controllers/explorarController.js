const { json } = require("express");
var explorarModel = require("../models/explorarModel");

function nacionalidades(req, res){
    let anoLanc = req.params.anoLanc;

    explorarModel.nacionalidades(anoLanc)
        .then(function (result){
            if(result.length > 1){
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

function generos(req, res){
    let anoLanc = req.params.anoLanc;
    let nacionalidade = req.params.nacionalidade;

    explorarModel.generos(anoLanc, nacionalidade)
        .then(function (result){
            if(result.length > 1){
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

function pyas(req, res){
    let anoLanc = req.params.anoLanc;
    let nacionalidade = req.params.nacionalidade;
    let genero = req.params.genero;

    explorarModel.pyas(anoLanc, nacionalidade, genero)
        .then(function (result){
            if(result.length > 1){
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

function resultados(req, res){
    let anoLanc = req.params.anoLanc;
    let nacionalidade = req.params.nacionalidade;
    let genero = req.params.genero;
    let pya = req.params.pya;

    explorarModel.resultados(anoLanc, nacionalidade, genero, pya)
        .then(function (result){
            if(result.length > 1){
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
    nacionalidades,
    generos,
    pyas,
    resultados
}