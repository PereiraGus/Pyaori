const PLAYER = document.getElementById("playerTime");
const PLAYER_BACKGROUND = document.getElementById("playerSlider");
const ICON_PLAY = document.getElementById("iconPlay");
const MINUTE_START = document.getElementById("playerMinuteStart");
const MINUTE_END = document.getElementById("playerMinuteEnd");
const ICON_VOLUME = document.getElementById("iconVolume");
const VOLUME_SLIDER = document.getElementById("playerVolume");

const DIV_INFOS_FAIXA = document.getElementById("playerInfosFaixa");
const TITULO_FAIXA = document.getElementById("playerTituloFaixa");
const ALBUM_FAIXA = document.getElementById("playerAlbumFaixa");
const ARTISTA_FAIXA = document.getElementById("playerArtistaFaixa");
const CAPA_FAIXA = document.getElementById("playerCapaFaixa");
const SETA_CAPA_FAIXA = document.getElementById("setaMostrarCapa");

var song = new Audio();
var minutos = 0;
var segundos = 0;
var atualizarMinutos = 0;

function carregarFaixa(album,faixa){
    //Carregando as infos da faixa para o player
    faixa--;

    TITULO_FAIXA.innerHTML = faixasAlbum[faixa].titulo;
    ALBUM_FAIXA.innerHTML = albumEscolhido.titulo;
    ARTISTA_FAIXA.innerHTML = "";
    for(var c = 0; c < faixaArtista.length; c++){
        if(faixaArtista[c].idFaixa == faixasAlbum[faixa].idFaixa){
            if(faixaArtista[c].principalOuConvidado == "P"){
                ARTISTA_FAIXA.innerHTML += `
                <span onclick="trocarPagina('artista',${faixaArtista.idArtista})">
                    ${faixaArtista[c].artista}
                </span>`;
            }
            else{
                ARTISTA_FAIXA.innerHTML += `, 
                <span onclick="trocarPagina('artista',${faixaArtista.idArtista})">
                    ${faixaArtista[c].artista}
                </span>`;
            }
        }
    }
    CAPA_FAIXA.src = `img/albuns/${albumEscolhido.idAlbum}.webp`;

    //Carregando o áudio da faixa
    faixa++;
    song.src = `albuns/${album}/${faixa}.mp3`;
    song.oncanplaythrough = () => {
        //Configurando os mostradores de minuto
        MINUTE_END.innerText = converterTempo(song.duration);
        PLAYER.max = Math.floor(song.duration);
        //A capa
        mostrarCapa(true);
        //E tocando
        tocarOuPausar();
    }
}

//Convertendo os segundos de uma música em M:SS
function converterTempo(tempo){
    minutos = Math.floor(tempo / 60);
    segundos = Math.floor(tempo - minutos * 60);
    if(segundos.toString().length == 1){
        return(`${minutos}:0${segundos}`);
    }
    else{
        return(`${minutos}:${segundos}`);
    }
}

//Atualiza os minutos e o slider automaticamente à cada 1s
//Também reseta tudo quando ela acaba
function atualizarTempo(){
    atualizarMinutos = setInterval(() =>{
        PLAYER.value = song.currentTime;
        MINUTE_START.innerText = converterTempo(song.currentTime);
        
        var progresso = (song.currentTime / song.duration) * 100;
        PLAYER.style.background = `linear-gradient(
            to right, 
            var(--purpleDark) ${progresso}%,
            var(--neutral) ${progresso}%)
        `;

        if(song.ended){
            clearInterval(atualizar);
            MINUTE_START.innerHTML = "0:00";
            PLAYER.value = 0;
            ICON_PLAY.className = "fa-solid fa-circle-play";
            PLAYER.style = `background-color: var(--neutral)`;
        }
    },100);
}

//Controla o pausar/tocar
function tocarOuPausar(){
    if(song.paused){
        song.play();
        ICON_PLAY.className = "fa-solid fa-circle-pause";    
        atualizarTempo();  
    }
    else{
        song.pause();
        ICON_PLAY.className = "fa-solid fa-circle-play";  
    }
}

//Atualiza o tempo atual da música de acordo com o slider
PLAYER.oninput = () => {
    song.currentTime = PLAYER.value;
    // atualizarTempo();
}

VOLUME_SLIDER.min = 0;
VOLUME_SLIDER.max = 100;
VOLUME_SLIDER.value = 75;
atualizarVolume();

function atualizarVolume(){
    song.volume = (VOLUME_SLIDER.value/100);
    VOLUME_SLIDER.style.background = `linear-gradient(
            to right, 
            var(--purpleDark) ${VOLUME_SLIDER.value}%,
            var(--neutral) ${VOLUME_SLIDER.value}%)
    `;
    if(VOLUME_SLIDER.value >= 80){
        ICON_VOLUME.className = "fa-solid fa-volume-high";
    }
    else if(VOLUME_SLIDER.value >= 25){
        ICON_VOLUME.className = "fa-solid fa-volume-low";
    }
    else if(VOLUME_SLIDER.value > 0){
        ICON_VOLUME.className = "fa-solid fa-volume-off";
    }
}

var volumeMudo = false;
var volumeAntigo = 0;
function mudo(){
    if(!volumeMudo){
        volumeAntigo = VOLUME_SLIDER.value;
        ICON_VOLUME.className = "fa-solid fa-volume-xmark";
        VOLUME_SLIDER.value = 0;
        VOLUME_SLIDER.disabled = true;
        song.volume = 0;
        volumeMudo = true;

        VOLUME_SLIDER.style = "background-color: var(--neutral)";
    }
    else{
        volumeMudo = false;
        VOLUME_SLIDER.disabled = false;
        VOLUME_SLIDER.value = volumeAntigo;
        atualizarVolume();
    }
}

function mostrarCapa(mostrar){
    CAPA_FAIXA.style = "animation-name: aparecer";
    if(mostrar){
        setTimeout(() => {
            CAPA_FAIXA.className = "capaMostrando";
            CAPA_FAIXA.style = "";
        },1000);
        SETA_CAPA_FAIXA.style = "display: none";
    }
    else{
        setTimeout(() => {
            CAPA_FAIXA.className = "capaEscondendo";
            CAPA_FAIXA.style = "";
        },1000);
        SETA_CAPA_FAIXA.style = "display: flex";
    }
}