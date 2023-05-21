const NOME_ARTISTA = document.getElementById("nomeArtista");
const FOTO_ARTISTA = document.getElementById("fotoArtista");
const BANDEIRA_NACAO_ARTISTA = document.getElementById("bandeiraArtista");
const ESTILO_ARTISTA = document.getElementById("estiloArtista");
const DISCOGRAFIA_ARTISTA = document.getElementById("discografiaArtista");

function carregarArtista(idArtista){
    NOME_ARTISTA.innerHTML = artistas[idArtista].nome;
    FOTO_ARTISTA.src =  `
        img/artistas/${artistas[idArtista].idArtista}.webp
    `;
    BANDEIRA_NACAO_ARTISTA.src =  `
        https://flagcdn.com/60x45/${artistas[idArtista].nacionalidade}.png
    `;
    ESTILO_ARTISTA.innerHTML = artistas[idArtista].estiloPrincipal;
    
    DISCOGRAFIA_ARTISTA.innerHTML = "";
    for(var i = 0; i < albunsDoArtista.length; i++){
        DISCOGRAFIA_ARTISTA.innerHTML += `
            <span onclick="trocarPagina('album',${albunsDoArtista[i].idAlbum})">
                <img src="img/albuns/${albunsDoArtista[i].idAlbum}.webp">
                <h4>${albunsDoArtista[i].titulo}</h4>
                <p>${albunsDoArtista[i].anoLanc}</p>
            </span>`;
    }
}