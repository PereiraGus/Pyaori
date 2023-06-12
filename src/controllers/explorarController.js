const { json } = require("express");
var explorarModel = require("../models/explorarModel");

function nacionalidades(req, res) {
    let anoMin = req.body.anoMin;
    let anoMax = req.body.anoMax;

    explorarModel.nacionalidades(anoMin, anoMax)
        .then(function (result) {
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(`Erro ao selecionar usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function generos(req, res) {
    let anoMin = req.body.anoMin;
    let anoMax = req.body.anoMax;
    let nacionalidade = req.body.nacionalidade;

    explorarModel.generos(anoMin, anoMax, nacionalidade)
        .then(function (result) {
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(`Erro ao selecionar usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function pyas(req, res) {
    let anoMin = req.body.anoMin;
    let anoMax = req.body.anoMax;
    let nacionalidade = req.body.nacionalidade;
    let genero = req.body.genero;

    explorarModel.pyas(anoMin, anoMax, nacionalidade, genero)
        .then(function (result) {
            if (result.length > 0) {
                console.log(result);
                res.json(result);
            }
            else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(`Erro ao selecionar usuário:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

function resultados(req, res) {
    let anoMin = req.body.anoMin;
    let anoMax = req.body.anoMax;
    let nacionalidade = req.body.nacionalidade;
    let genero = req.body.genero;
    let pya = req.body.pya;
    let idUsuario = req.body.idUsuario;

    explorarModel.resultados(anoMin, anoMax, nacionalidade, genero, pya, idUsuario)
        .then(function (result) {
            if (result.length > 0) {
                console.log(result);
                res.json(result);
            }
            else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch(function (error) {
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