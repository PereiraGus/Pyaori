const { json } = require("express");
var musicaModel = require("../models/musicaModel");

function selecionarAlbum(req, res){
    let idAlbum = req.params.idAlbum;

    musicaModel.selecionarAlbum(idAlbum)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

function selecionarArtistasMusica(req, res){
    let idAlbum = req.params.idAlbum;

    musicaModel.selecionarArtistasMusica(idAlbum)
        .then(function (result){
            res.json(result);
        })
        .catch(function (error){
            console.log("Houve um erro ao realizar a consulta! Erro: ", error.sqlMessage);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    selecionarAlbum,
    selecionarArtistasMusica
}