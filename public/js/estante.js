/*JS que vai trocar as abas de explorar*/
const SALVOS = document.getElementById("estanteSalvos");
const ESTATISTICAS = document.getElementById("estanteEstatisticas");
const CONFIGS = document.getElementById("configs");

const ABA_SALVOS = document.getElementById("abaSuaEstante");
const ABA_ESTATISTICAS = document.getElementById("abaEstatisticas");

var abas = [SALVOS,ESTATISTICAS,CONFIGS];

function esconderMostrarPlayer(estadoDoPlayer){
    if(estadoDoPlayer){
        player.style = "display: flex";
        playerCapaFaixa.style = "display: block";
        main.className = "";
    }
    else{
        player.style = "display: none";
        playerCapaFaixa.style = "display: none";
        main.className = "mainPaginaInteira";
    }
}

function trocarAba(abaDestino){
    linkSuporteTecnico.style = "display: none";
    estatisticasErro.style = "display: none";
    for(var i = 0; i < abas.length; i++){
        if(abas[i].id == abaDestino){
            switch (abaDestino) {
                case 'estanteSalvos':
                    ABA_SALVOS.className = null;
                    ABA_ESTATISTICAS.className = "abaInativa";
                    carregarSalvos();
                    esconderMostrarPlayer(true);
                    break;
                case 'estanteEstatisticas':
                    ABA_SALVOS.className = "abaInativa";
                    ABA_ESTATISTICAS.className = null;
                    esconderMostrarPlayer(true);
                    estMaisOuvidas();
                    break;
                case 'configs':
                    ABA_SALVOS.className = "abaInativa";
                    ABA_ESTATISTICAS.className = "abaInativa";
                    linkSuporteTecnico.style = "display: flex";
                    carregarInfosPerfil();
                    esconderMostrarPlayer(false);
                    break;
            }
            abas[i].style = "display: flex;"
            console.log(`Trocou para a aba ${abas[i].id} da estante.`)
        }
        else{
            abas[i].style = "display: none";
        }
    }
}

function carregarSalvos(){
    SALVOS.innerHTML = "";
    let idUsuario = perfil.id;

    fetch(`usuario/carregarAvaliados/${idUsuario}/S`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) { response.json().then(json => {
            for(var i = 0;i < json.length; i++){
                SALVOS.innerHTML += `
                    <span>
                        <img src="img/albuns/${json[i].idAlbum}.webp" onclick="trocarPagina('album',${json[i].idAlbum})">
                        <h4 onclick="trocarPagina('album',${json[i].idAlbum})">${json[i].titulo}</h4>
                        <p onclick="trocarPagina('artista',${json[i].artista})">${json[i].artista}</p>
                    </span>
                `
            }
        })}
        else{
            if(response.status == 404){
                console.warn("Nenhum álbum salvo.");
                SALVOS.innerHTML += `
                <p style="text-align: center; width: 100%; margin-top: 15%">
                    Nenhum álbum salvo. Vá para 'Explorar' para descobrir novas batidas e melodias!
                </p>`;
            }
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });

    
}