const { json } = require("express");
var estatisticasModel = require("../models/estatisticasModel");

function maisOuvidas(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.maisOuvidas(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function pyas(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.pyas(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function artistasFavoritos(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.artistasFavoritos(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function paisesFavoritos(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.paisesFavoritos(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function estilosFavoritos(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.estilosFavoritos(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function ultimasReproducoes(req, res){
    let idUsuario = req.params.idUsuario;

    estatisticasModel.ultimasReproducoes(idUsuario)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    maisOuvidas,
    pyas,
    artistasFavoritos,
    paisesFavoritos,
    estilosFavoritos,
    ultimasReproducoes
}