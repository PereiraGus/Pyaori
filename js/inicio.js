
const FAVS = document.getElementById("inicioFavs");
const RECOMENDS = document.getElementById("inicioRecomends");

function carregarFavs(){
    FAVS.innerHTML = "";
    //Array de JSONs provisório até a conexão com o banco
    var musicas = [
        {
            imagem: "construcao",
            titulo: "Contrução",
            artista: "Chico Buarque"
        },
        {
            imagem: "love-song",
            titulo: "Love Song",
            artista: "Sara Bairelles"
        },
        {
            imagem: "nao-fosse-tao-tarde",
            titulo: "Não Fosse Tão Tarde",
            artista: "Lou Garcia"
        },
        {
            imagem: "patched-up",
            titulo: "Patched Up",
            artista: "Beabadobee"
        },
        {
            imagem: "the-blueprint-3",
            titulo: "The Blueprint 3",
            artista: "Jay-Z"
        }
    ]
    for(var i = 0;i < musicas.length; i++){
        FAVS.innerHTML += `
            <span>
                <img src="img/albuns/${musicas[i].imagem}.webp">
                <h4>${musicas[i].titulo}</h4>
                <p>${musicas[i].artista}</p>
            </span>
        `
    }
}

function carregarRecomends(){
    RECOMENDS.innerHTML = "";
    //Array de JSONs provisório até a conexão com o banco
    var musicas = [
        {
            imagem: null,
            titulo: "successful",
            artista: "Ariana Grande"
        },
        {
            imagem: null,
            titulo: "POV",
            artista: "Ariana Grande"
        },
        {
            imagem: null,
            titulo: "1000 doves",
            artista: "Lady Gaga"
        }
    ]
    for(var i = 0;i < musicas.length; i++){
        RECOMENDS.innerHTML += `
            <span>
                <img src="img/albuns/${musicas[i].imagem}.webp">
                <h4>${musicas[i].titulo}</h4>
                <p>${musicas[i].artista}</p>
            </span>
        `
    }
}