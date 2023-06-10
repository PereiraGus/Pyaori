var express = require("express");
var router = express.Router();

var explorarController = require("../controllers/explorarController");

router.get("/passo1/:anoLanc", function(req, res){
    explorarController.nacionalidades(req, res);
});

router.get("/passo2/:anoLanc/:nacionalidade", function(req, res){
    explorarController.generos(req, res);
});

router.get("/passo3/:anoLanc/:nacionalidade/:genero", function(req, res){
    explorarController.pyas(req, res);
});

router.get("/passo4/:anoLanc/:nacionalidade/:genero/:pya", function(req, res){
    explorarController.resultados(req, res);
});

module.exports = router;