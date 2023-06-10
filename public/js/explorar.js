/*JS que vai tratar as escolhas do usuário na aba explorar*/
const DECADA = document.getElementById("explorarDecada");
const NACAO = document.getElementById("explorarNacionalidade");
const ESTILO = document.getElementById("explorarEstilo");
const PYA = document.getElementById("explorarPya");
const RESULT = document.getElementById("explorarResultados");

//Variáveis para adaptar o título e descrição da pergunta
var tituloAtual = document.getElementById("perguntaTitulo");
var descAtual = document.getElementById("perguntaDesc");

var pesquisa = [
    {
        titulo: "Selecione uma época abaixo",
        opcoes: [
            "Qualquer uma", "Décadas de 40, 50 e 60", "Décadas de 70, 80 e 90", "Anos 2000", "2010 - Hoje"
        ],
        desc: null
    }];

//Mesma lógica do array de 'navegacao.js'
var perguntas = [DECADA, NACAO, ESTILO, PYA, RESULT];

//Variável que armazena os filtros
var filtros = ["", "", "", ""];
var respondidas = 0;

function passarPerguntas() {
    console.log("Passando para pergunta sobre " + perguntas[respondidas].id);
    if (respondidas != 0) {
        perguntas[respondidas - 1].style = "display: none";
    }
    perguntas[respondidas].style = "display: flex";
}

function marcarResposta(resposta) {
    filtros[respondidas] = "/"+resposta;
    respondidas++;

    fetch(`explorar/passo${respondidas}${filtros[0]}${filtros[1]}${filtros[2]}${filtros[3]}`, {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            // if (response.status == 100) {
            //     console.log("No processo");
            // }
            // else if (response.status == 200) {
            //     console.log("FIM");
            // }
            response.json().then(json => {   
                for (var c = 0; c < json.length; c++) {
                    perguntas[respondidas].innerHTML += `
                        <button id="btn${respondidas+1}${c}"
                            onclick="marcarResposta('${json[c].opcao}')">
                            ${json[c].opcao}
                        </button>`
                }
            })
        }
    }).catch(function (response) {
        console.log("ERRO: ", response);
    });


    passarPerguntas();
}

function reiniciarExplorar() {
    filtros = ["", "", "", ""];
    NACAO.innerHTML = null;
    ESTILO.innerHTML = null;
    PYA.innerHTML = null;
    passarPerguntas('explorarDecada');
}

//Função que entrega os resultados do banco
function darResultados() {
    console.log(`Resultados: ${filtros}`);
    //Array de JSONs provisório até a conexão com o banco
    var albuns = [
        {
            imagem: "todo-mundo-menos-eu",
            titulo: "Todo mundo menos eu",
            artista: "Lou Garcia"
        },
        {
            imagem: "quem-me-dera",
            titulo: "Quem Me Dera",
            artista: "Ariana Grande"
        },
        {
            imagem: "rajadao",
            titulo: "Rajadão",
            artista: "Pabllo Vittar"
        }
    ]
    const TITULO_GUIA = document.getElementById("explorarTitulo");
    const LISTA_albuns = document.getElementById("explorarListaDealbuns");
    LISTA_albuns.innerHTML = null;

    TITULO_GUIA.innerHTML = "Resultados";
    for (var respondidas = 0; respondidas < albuns.length; respondidas++) {
        LISTA_albuns.innerHTML += `
        <span>
            <div class="explorarMusica" style="background-image:url('img/albuns/${albuns[respondidas].imagem}.webp');">
                <div class="optDispMusica" id="optDisp${respondidas}"></div>
                <div class="optSalvMusica" id="optSalv${respondidas}"></div>
            </div>
            <h4>${albuns[respondidas].titulo}</h4>
            <p>${albuns[respondidas].artista}</p>
        `;
        var dispensarMusicaAtual = document.getElementById(`optDisp${respondidas}`);
        dispensarMusicaAtual.innerHTML += `
            <respondidas class="fa-solid fa-x"></respondidas>
        `;
        var salvarMusicaAtual = document.getElementById(`optSalv${respondidas}`);
        salvarMusicaAtual.innerHTML += `
            <respondidas class="fa-solid fa-bookmark"></respondidas>
        `;
    }
}