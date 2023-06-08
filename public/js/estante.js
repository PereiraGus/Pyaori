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
        main.className = "";
    }
    else{
        player.style = "display: none";
        main.className = "mainPaginaInteira";
    }
}

function trocarAba(abaDestino){
    linkSuporteTecnico.style = "display: none";
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

var perfil = null;
//JSON provisório até a conexão com o banco
perfil = {
    nome: "PearGus",
    avatar: "1",
    email: "gustavo.castro@sptech.school",
    maioridade: true,
    pronomes: "Ele/Dele"
}
function carregarPerfil(){
    const NOME = document.getElementById("nomePerfil");
    const AVATAR = document.getElementById("avatarPerfil");

    NOME.innerHTML = perfil.nome;
    AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
}

function carregarSalvos(){
    SALVOS.innerHTML = "";
    //Array de JSONs provisório até a conexão com o banco
    var albuns = [
        {
            id: 1,
            imagem: "construcao",
            titulo: "Contrução",
            artista: "Chico Buarque"
        },
        {
            id: 2,
            imagem: "love-song",
            titulo: "Love Song",
            artista: "Sara Bairelles"
        },
        {
            id: 3,
            imagem: "nao-fosse-tao-tarde",
            titulo: "Não Fosse Tão Tarde",
            artista: "Lou Garcia"
        },
        {
            id: 4,
            imagem: "patched-up",
            titulo: "Patched Up",
            artista: "Beabadobee"
        },
        {
            id: 5,
            imagem: "the-blueprint-3",
            titulo: "The Blueprint 3",
            artista: "Jay-Z"
        }
    ]
    for(var i = 0;i < albuns.length; i++){
        SALVOS.innerHTML += `
            <span onclick="trocarPagina(${albuns[i].id})">
                <img src="img/albuns/${albuns[i].imagem}.webp">
                <h4>${albuns[i].titulo}</h4>
                <p>${albuns[i].artista}</p>
            </span>
        `
    }
}