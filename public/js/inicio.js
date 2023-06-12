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
                    console.log(json);
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
    // RECOMENDS.innerHTML = "";
    // //Array de JSONs provisório até a conexão com o banco
    // var albuns = [
    //     {
    //         id: 7,
    //         imagem: null,
    //         titulo: "Positions",
    //         artista: "Ariana Grande"
    //     },
    //     {
    //         id: 9,
    //         imagem: null,
    //         titulo: "Chromatica",
    //         artista: "Lady Gaga"
    //     }
    // ]
    // for(var i = 0;i < albuns.length; i++){
    //     RECOMENDS.innerHTML += `
    //         <span onclick="trocarPagina(${albuns[i].id})">
    //             <img src="img/albuns/${albuns[i].imagem}.webp">
    //             <h4>${albuns[i].titulo}</h4>
    //             <p>${albuns[i].artista}</p>
    //         </span>
    //     `
    // }
}