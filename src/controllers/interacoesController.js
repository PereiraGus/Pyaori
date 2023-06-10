const { json } = require("express");
var interacoesModel = require("../models/interacoesModel");

function salvarOuDispensar(req, res) {
    let idUsuario = req.body.idUsuario;
    let idAlbum = req.body.idAlbum;
    let salvarDispensar = req.body.salvarDispensar;

    interacoesModel.salvarOuDispensar(idUsuario, idAlbum, salvarDispensar)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            console.log(error);
            console.log(`Erro ao salvar faixa:\n ${error.sqlMessage}`);
            res.status(500).json(error.sqlMessage);
        });
}

module.exports = {
    salvarOuDispensar
}