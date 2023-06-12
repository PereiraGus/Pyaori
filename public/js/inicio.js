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
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}