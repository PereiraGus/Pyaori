var song = null;
var minutos = 0;
var segundos = 0;
var atualizarMinutos = 0;
var tocandoMusica = false;

var i = 0;
var faixas = [];

function carregarFaixa(idAlbum, indiceFaixa){
    i = indiceFaixa;
    if(tocandoMusica){
        tocarOuPausar();
    }

    fetch(`musica/selecionarAlbum/${idAlbum}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                faixas = json;
                atualizarInformacoes(json[indiceFaixa]);
                marcarReproducao(json[indiceFaixa].idFaixa);
            })
        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}

function marcarReproducao(varIdFaixa){
    fetch(`interacoes/marcarReproducao`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuario: perfil.id,
            idFaixa: varIdFaixa
        })
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}

function atualizarInformacoes(faixa){
    playerTituloFaixa.innerHTML = faixa.titulo;
    playerAlbumFaixa.innerHTML = `<span onclick="trocarPagina('album',${faixa.idAlbum})">${faixa.album}</span>`;

    playerCapaFaixa.src = `img/albuns/${faixa.idAlbum}.webp`;
    mostrarCapa(true);

    song = new Audio();
    song.loop = false;
    song.src = `audio/${faixa.idAlbum}/${faixa.idFaixa}.mp3`;
    song.oncanplaythrough = () => {
        playerMinuteEnd.innerText = converterTempo(song.duration);
        playerTime.max = Math.floor(song.duration);
        tocarOuPausar();
        tocandoMusica = true;
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
        playerTime.value = song.currentTime;
        playerMinuteStart.innerText = converterTempo(song.currentTime);
        
        var progresso = (song.currentTime / song.duration) * 100;
        playerTime.style.background = `linear-gradient(
            to right, 
            var(--purpleDark) ${progresso}%,
            var(--neutral) ${progresso}%)
        `;

        if(song.ended){
            clearInterval(atualizarMinutos);
            playerMinuteStart.innerHTML = "0:00";
            playerTime.value = 0;
            iconPlay.className = "fa-solid fa-circle-play";
            playerTime.style = `background-color: var(--neutral)`;
            tocandoMusica = false;
            proxima();
        }
    },100);
}

//Controla o pausar/tocar
function tocarOuPausar(){
    if(song.paused){
        song.play();
        iconPlay.className = "fa-solid fa-circle-pause";    
        atualizarTempo();  
    }
    else{
        song.pause();
        iconPlay.className = "fa-solid fa-circle-play";  
    }
}

//Atualiza o tempo atual da música de acordo com o slider
playerTime.oninput = () => {
    song.currentTime = playerTime.value;
}

function reiniciar(){
    song.currentTime = 0;
    tocarOuPausar();
}

function proxima(){
    i++;
    if(faixas[i] != undefined){
        atualizarInformacoes(faixas[i]);
        marcarReproducao(faixas[i].idFaixa);
    }
    else{
        sfx.notificacao.play();
        alert("A fila acabou");
    }
}

playerVolume.min = 0;
playerVolume.max = 100;
playerVolume.value = 75;
atualizarVolume();

function atualizarVolume(){
    song.volume = (playerVolume.value/100);
    playerVolume.style.background = `linear-gradient(
            to right, 
            var(--purpleDark) ${playerVolume.value}%,
            var(--neutral) ${playerVolume.value}%)
    `;
    if(playerVolume.value >= 80){
        iconVolume.className = "fa-solid fa-volume-high";
    }
    else if(playerVolume.value >= 25){
        iconVolume.className = "fa-solid fa-volume-low";
    }
    else if(playerVolume.value > 0){
        iconVolume.className = "fa-solid fa-volume-off";
    }
}

var volumeMudo = false;
var volumeAntigo = 0;
function mudo(){
    if(!volumeMudo){
        volumeAntigo = playerVolume.value;
        iconVolume.className = "fa-solid fa-volume-xmark";
        playerVolume.value = 0;
        playerVolume.disabled = true;
        song.volume = 0;
        volumeMudo = true;

        playerVolume.style = "background-color: var(--neutral)";
    }
    else{
        volumeMudo = false;
        playerVolume.disabled = false;
        playerVolume.value = volumeAntigo;
        atualizarVolume();
    }
}

var capaMostrando = false;
function mostrarCapa(mostrar){
    if(mostrar){
        if(!capaMostrando){
            playerCapaFaixa.style = "animation-name: aparecer";
            setTimeout(() => {
                playerCapaFaixa.className = "capaMostrando";
                playerCapaFaixa.style = "";
            },1000);
            setaMostrarCapa.style = "display: none";
            capaMostrando = true;
        }
    }
    else{
        if(capaMostrando){
            playerCapaFaixa.style = "animation-name: aparecer";
            setTimeout(() => {
                playerCapaFaixa.className = "capaEscondendo";
                playerCapaFaixa.style = "";
            },1000);
            setaMostrarCapa.style = "display: flex";
            capaMostrando = false;
        }
    }
}