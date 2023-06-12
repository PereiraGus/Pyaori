const RECOMENDS = document.getElementById("inicioRecomends");

function saudarUsuario(){
    saudacao.innerHTML = `Olá, ${perfil.nome}!<img src="img/avatares/${perfil.avatar}.webp">`;
}

function carregarFavs() {
    inicioFavs.innerHTML = "";
    fetch(`estatisticas/maisOuvidas/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                for (let z = 0; z < json.length && z < 5; z++) {
                        inicioFavs.innerHTML += `
                                <span onclick="trocarPagina('album',${json[z].idAlbum})">
                                    <img src="img/albuns/${json[z].idAlbum}.webp">
                                    <h4>${json[z].titulo}</h4>
                                    <p>${json[z].artista}</p>
                                </span>
                            `
                }
            })
        }
        else if(response.status == 404){
            inicioFavs.innerHTML += `<h2 id="favsVazio">Opa ${perfil.nome}, como vai? Percebemos que você ainda não ouviu nada, então essa sessão aqui ficou vazia. Quando você se sentir à vontade, acesse um álbum, ouça algumas faixas e então poderemos atualizar esta parte.</h2>`;
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}

function carregarRecomends() {
    inicioRecomends.innerHTML = "";
    fetch(`usuario/gerarRecomendacoes/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                for (let z = 0; z < json.length && z < 5; z++) {
                    console.log(json);
                    inicioRecomends.innerHTML += `
                                <span onclick="trocarPagina('album',${json[z].idAlbum})">
                                    <img src="img/albuns/${json[z].idAlbum}.webp">
                                    <h4>${json[z].titulo}</h4>
                                    <p>${json[z].nome}</p>
                                </span>
                            `
                }
            })
        }
        else if(response.status == 404){
            inicioRecomends.innerHTML += `<h2 id="recommendsVazio">Eaí ${perfil.nome}! A gente ainda não se conhece muito bem, então não sabemos o que recomendar à você. Salve algumas músicas e saberemos melhor que tipo de som você curte.</h2>`;
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}