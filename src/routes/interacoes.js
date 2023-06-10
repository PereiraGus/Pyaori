var express = require("express");
var router = express.Router();

var interacoesController = require("../controllers/interacoesController");

router.post("/salvarOuDispensar", function(req, res){
    interacoesController.salvarOuDispensar(req, res);
});

router.post("/marcarReproducao", function(req, res){
    interacoesController.marcarReproducao(req, res);
});

module.exports = router;