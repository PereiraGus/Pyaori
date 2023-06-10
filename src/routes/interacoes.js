var express = require("express");
var router = express.Router();

var interacoesController = require("../controllers/interacoesController");

router.post("/salvarOuDispensar", function(req, res){
    interacoesController.salvarOuDispensar(req, res);
});

module.exports = router;