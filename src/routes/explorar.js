var express = require("express");
var router = express.Router();

var explorarController = require("../controllers/explorarController");

router.post("/passo1", function(req, res){
    explorarController.nacionalidades(req, res);
});

router.post("/passo2", function(req, res){
    explorarController.generos(req, res);
});

router.post("/passo3", function(req, res){
    explorarController.pyas(req, res);
});

router.post("/passo4", function(req, res){
    explorarController.resultados(req, res);
});

module.exports = router;