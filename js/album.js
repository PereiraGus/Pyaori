const IMG_CAPA_ALBUM = document.getElementById("imgAlbumCapa");
const TITULO_ALBUM = document.getElementById("tituloAlbum");
const MAIS_INFOS_ALBUM = document.getElementById("maisInfosAlbum");
const DIV_FAIXAS_ALBUM = document.getElementById("faixasAlbum");

function carregarAlbum(idAlbum){
    MAIS_INFOS_ALBUM.innerHTML = "";
    DIV_FAIXAS_ALBUM.innerHTML = "";

    IMG_CAPA_ALBUM.src = "img/albuns/" + albumEscolhido.imagem + ".webp";
    TITULO_ALBUM.innerHTML = albumEscolhido.titulo;
    if(albumEscolhido.explicito){
        TITULO_ALBUM.innerHTML += `
        <span id="infosAlbumExplito" class="infosAlbumExplito">
            E
        </span>
        `;
    }
    MAIS_INFOS_ALBUM.innerHTML += `
    <img src="img/artistas/${albumEscolhido.idArtista}.webp">
    ${albumEscolhido.nomeArtista}
     | 
    ${albumEscolhido.anoLanc}
    `;


    for(var i = 0; i < faixasAlbum.length; i++){
        var faixaExplicita = "";
        if(faixasAlbum[i].explicita){
            faixaExplicita = `
            <span class="infosAlbumExplito">
                E
            </span>
            `;
        }

        DIV_FAIXAS_ALBUM.innerHTML += `
        <div>
            <i class="fa-solid fa-play"></i>
            <span class="numFaixaAlbum">
                ${faixasAlbum[i].idFaixa}.
            </span>
            <h3 class="tituloFaixaAlbum">
                ${faixasAlbum[i].titulo}
            </h3>
            ${faixaExplicita}
            </span>
            <h4 class="artistaFaixaAlbum">
            </h4>
            <span class="duracaoFaixaAlbum">
                ${faixasAlbum[i].duracao}
            </span>
        </div>
        `;

        var ultimaFaixa = document.getElementsByClassName("artistaFaixaAlbum");
        for(var c = 0; c < faixaArtista.length; c++){
            if(faixaArtista[c].idFaixa == faixasAlbum[i].idFaixa){
                if(faixaArtista[c].principalOuConvidado == "P"){
                    ultimaFaixa.item(i).innerHTML += faixaArtista[c].artista;
                }
                else{
                    ultimaFaixa.item(i).innerHTML += `, ${faixaArtista[c].artista}`;
                }
            }
        }
    }
}