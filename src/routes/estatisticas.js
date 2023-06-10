var express = require("express");
var router = express.Router();

var estatisticasController = require("../controllers/estatisticasController");

router.get("/maisOuvidas/:idUsuario", function(req, res){
    estatisticasController.maisOuvidas(req, res);
});

router.get("/pyas/:idUsuario", function(req, res){
    estatisticasController.pyas(req, res);
});

router.get("/artistasFavoritos/:idUsuario", function(req, res){
    estatisticasController.artistasFavoritos(req, res);
});

router.get("/paisesFavoritos/:idUsuario", function(req, res){
    estatisticasController.paisesFavoritos(req, res);
});

router.get("/estilosFavoritos/:idUsuario", function(req, res){
    estatisticasController.estilosFavoritos(req, res);
});

router.get("/ultimasReproducoes/:idUsuario", function(req, res){
    estatisticasController.ultimasReproducoes(req, res);
});

module.exports = router;