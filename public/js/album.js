const IMG_CAPA_ALBUM = document.getElementById("imgAlbumCapa");
const TITULO_ALBUM = document.getElementById("tituloAlbum");
const MAIS_INFOS_ALBUM = document.getElementById("maisInfosAlbum");
const DIV_FAIXAS_ALBUM = document.getElementById("faixasAlbum");

function carregarAlbum(idAlbum) {
    IMG_CAPA_ALBUM.style = "visibility: hidden";
    TITULO_ALBUM.innerHTML = "";
    MAIS_INFOS_ALBUM.innerHTML = "";
    DIV_FAIXAS_ALBUM.innerHTML = "";
    cabecalhoAlbum.className = "loading";
    setTimeout(()=>{
        selecionarAlbum(idAlbum);
        cabecalhoAlbum.className = "";
        IMG_CAPA_ALBUM.style = "visibility: visible";
    },500);
}
function selecionarAlbum(idAlbum){
    fetch(`musica/selecionarAlbum/${idAlbum}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {

                console.log(json);
                IMG_CAPA_ALBUM.src = `img/albuns/${json[0].idAlbum}.webp`;
                TITULO_ALBUM.innerHTML = json[0].album;
                if (json[0].explicita == 1) {
                    TITULO_ALBUM.innerHTML += `
                <span id="infosAlbumExplito" class="infosAlbumExplito">
                    E
                </span>
                `;
                }
                MAIS_INFOS_ALBUM.innerHTML += `
            <span onclick="trocarPagina('artista',${json[0].idArtista})">
                <img src="img/artistas/${json[0].idArtista}.webp">
                ${json[0].nome}
            </span>
            | 
            ${json[0].anoLanc}
            `;

                for (let i = 0; i < json.length; i++) {
                    var faixaExplicita = "";
                    if (json[i].explicita == 1) {
                        faixaExplicita = `
                    <span class="infosAlbumExplito">
                        E
                    </span>
                    `;
                    }

                    DIV_FAIXAS_ALBUM.innerHTML += `
                <div id="faixa${i+1}">
                    <i class="fa-solid fa-play"
                        onclick="carregarFaixa(${idAlbum},${i})"></i>
                    <span class="numFaixaAlbum">
                        ${i + 1}.
                    </span>
                    <h3 class="tituloFaixaAlbum">
                        ${json[i].titulo}
                    </h3>
                    ${faixaExplicita}
                    </span>
                </div>
                `;
                }
                carregarArtistasFaixas(json);
                carregarAudio(idAlbum, json.length);
            })
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    })
}

function carregarArtistasFaixas(faixas) {
    for (let i = 0; i < faixas.length; i++) {
        fetch(`musica/selecionarArtistasMusica/${faixas[i].idFaixa}`, {
            cache: 'no-store',
        }).then(function (response) {
            if (response.ok) {
                response.json().then(json => {                    
                    let idAtual = "faixa"+(i+1);
                    let faixaAtual = document.getElementById(idAtual);
                    let areaArtista = document.createElement("span");
                    areaArtista.className = "artistaFaixaAlbum";

                    for (let c = 0; c < json.length; c++) {
                        if (json[c].principalOuConvidado == "P") {
                            areaArtista.innerHTML += `
                            <span onclick="trocarPagina('artista',${json[c].idArtista})">
                                ${json[c].nome}
                            </span>`;
                        }
                        else {
                            areaArtista.innerHTML += `,
                            <span onclick="trocarPagina('artista',${json[c].idArtista})">
                                ${json[c].nome}
                            </span>`;
                        }
                    }
                    faixaAtual.appendChild(areaArtista);
                })
            }
        }).catch(function (response) {
            window.location = "https://http.cat/500";
        })
    }
}

function carregarAudio(idAlbum, quantidade){
    for (let i = 0; i < quantidade; i++) {
        let url = `audio/${idAlbum}/${i+1}.mp3`;;
        let http = new XMLHttpRequest();

        http.open('HEAD', url, false);
        http.send();

        let idAtual = "faixa"+(i+1);
        let faixaAtual = document.getElementById(idAtual);

        if(http.status == 404){
            faixaAtual.className = "faixaIndisponivel";

            let avisoIn = document.createElement("p");
            avisoIn.className = "avisoInd";
            avisoIn.innerText = "(Reprodução indisponível)";
            faixaAtual.appendChild(avisoIn);
        }
        else{
            let tempAudio = new Audio();
            tempAudio.src = url;
            tempAudio.load();
            tempAudio.oncanplaythrough = () => {
                let avisoIn = document.createElement("span");
                avisoIn.className = "duracaoFaixaAlbum";
                avisoIn.innerText = converterTempo(tempAudio.duration);
                faixaAtual.appendChild(avisoIn);
            }
        }
    }
}