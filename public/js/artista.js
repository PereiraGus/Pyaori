const NOME_ARTISTA = document.getElementById("nomeArtista");
const FOTO_ARTISTA = document.getElementById("fotoArtista");
const BANDEIRA_NACAO_ARTISTA = document.getElementById("bandeiraArtista");
const ESTILO_ARTISTA = document.getElementById("estiloArtista");
const DISCOGRAFIA_ARTISTA = document.getElementById("discografiaArtista");

function carregarArtista(idArtista){
    NOME_ARTISTA.innerHTML = "";
    FOTO_ARTISTA.src = "img/loading.gif";
    BANDEIRA_NACAO_ARTISTA.src = "";
    ESTILO_ARTISTA.innerHTML = "";
    DISCOGRAFIA_ARTISTA.innerHTML = "";
    setTimeout(()=>{
        selecionarArtista(idArtista);
    },500);
}

function selecionarArtista(idArtista){
    DISCOGRAFIA_ARTISTA.innerHTML = "";
    fetch(`musica/selecionarDiscografiaArtista/${idArtista}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                for (let z = 0; z < json.length && z < 5; z++) {
                    console.log(json);
                    NOME_ARTISTA.innerHTML = json[0].nome;
                    FOTO_ARTISTA.src =  `img/artistas/${json[0].idArtista}.webp`;
                    BANDEIRA_NACAO_ARTISTA.src =  `https://flagcdn.com/60x45/${json[0].nacionalidade}.png`;
                    ESTILO_ARTISTA.innerHTML = json[0].generoPrinc;
                    
                    DISCOGRAFIA_ARTISTA.innerHTML = "";
                    for(var i = 0; i < json.length; i++){
                        DISCOGRAFIA_ARTISTA.innerHTML += `
                            <span onclick="trocarPagina('album',${json[i].idAlbum})">
                                <img src="img/albuns/${json[i].idAlbum}.webp">
                                <h4>${json[i].titulo}</h4>
                                <p>${json[i].anoLanc}</p>
                            </span>`;
                    }
                }
            })
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}