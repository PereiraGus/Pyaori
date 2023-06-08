var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastro", function(req, res){
    usuarioController.cadastro(req, res);
});

router.post("/login", function(req, res){
    usuarioController.login(req, res);
})

router.get("/selecionar/:idUsuario", function(req, res){
    usuarioController.selecionar(req, res);
})

router.get("/", function(req, res){
    console.log("Funcionando");
})

module.exports = router;