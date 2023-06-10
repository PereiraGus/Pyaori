var express = require("express");
var router = express.Router();

var musicaController = require("../controllers/musicaController");

router.get("/selecionarAlbum/:idAlbum", function(req, res){
    musicaController.selecionarAlbum(req, res);
});

router.get("/selecionarArtistasMusica/:idAlbum", function(req, res){
    musicaController.selecionarArtistasMusica(req, res);
});

module.exports = router;