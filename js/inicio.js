
const FAVS = document.getElementById("inicioFavs");
const RECOMENDS = document.getElementById("inicioRecomends");

function carregarFavs(){
    FAVS.innerHTML = "";
    //Array de JSONs provisório até a conexão com o banco
    var albuns = [
        {
            id: 1,
            imagem: "artpop",
            titulo: "ARTPOP",
            artista: "Lady Gaga"
        },
        {
            id: 2,
            imagem: "love-song",
            titulo: "Love Song",
            artista: "Sara Bairelles"
        },
        {
            id: 3,
            imagem: "nao-fosse-tao-tarde",
            titulo: "Não Fosse Tão Tarde",
            artista: "Lou Garcia"
        },
        {
            id: 4,
            imagem: "patched-up",
            titulo: "Patched Up",
            artista: "Beabadobee"
        },
        {
            id: 5,
            imagem: "the-blueprint-3",
            titulo: "The Blueprint 3",
            artista: "Jay-Z"
        },
        {
            id: 6,
            imagem: "brutus",
            titulo: "brutus",
            artista: "the buttress"
        }
    ]
    for(var i = 0;i < albuns.length; i++){
        FAVS.innerHTML += `
            <span onclick="trocarPagina('album',${albuns[i].id})">
                <img src="img/albuns/${albuns[i].imagem}.webp">
                <h4>${albuns[i].titulo}</h4>
                <p>${albuns[i].artista}</p>
            </span>
        `
    }
}

function carregarRecomends(){
    RECOMENDS.innerHTML = "";
    //Array de JSONs provisório até a conexão com o banco
    var albuns = [
        {
            id: 7,
            imagem: null,
            titulo: "Positions",
            artista: "Ariana Grande"
        },
        {
            id: 9,
            imagem: null,
            titulo: "Chromatica",
            artista: "Lady Gaga"
        }
    ]
    for(var i = 0;i < albuns.length; i++){
        RECOMENDS.innerHTML += `
            <span onclick="trocarPagina(${albuns[i].id})">
                <img src="img/albuns/${albuns[i].imagem}.webp">
                <h4>${albuns[i].titulo}</h4>
                <p>${albuns[i].artista}</p>
            </span>
        `
    }
}