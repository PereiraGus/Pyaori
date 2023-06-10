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

router.put("/atualizar/:idUsuario", function(req, res){
    usuarioController.atualizar(req, res);
})

router.put("/trocarAvatar/:idUsuario", function(req, res){
    usuarioController.trocarAvatar(req, res);
})

router.put("/trocarSenha/:idUsuario", function(req, res){
    usuarioController.trocarSenha(req, res);
})

router.get("/carregarAvaliados/:idUsuario/:salvoOuDispensado", function(req, res){
    usuarioController.carregarSalvos(req, res);
})

module.exports = router;