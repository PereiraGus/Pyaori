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
            "Qualquer uma","Décadas de 40, 50 e 60","Décadas de 70, 80 e 90","Anos 2000","2010 - Hoje"
        ],
        desc: null
    },
    {
        titulo: "Selecione uma nacionalidade abaixo",
        opcoes: [
            "Qualquer uma",
            "Brasil",
            "USA",
            "Japão",
            "França",
            "Reino Unido"
        ],
        imagens: [
            "Qualquer uma",
            '<img class="bandeira" src="https://flagcdn.com/60x45/br.png">',
            '<img class="bandeira" src="https://flagcdn.com/60x45/us.png">',
            '<img class="bandeira" src="https://flagcdn.com/60x45/jp.png">',
            '<img class="bandeira" src="https://flagcdn.com/60x45/fr.png">',
            '<img class="bandeira" src="https://flagcdn.com/60x45/gb.png">'
        ],
        desc: "Músicas de mais países serão adicionadas ao longo das atualizações"

    },
    {
        titulo: "Selecione um estilo abaixo",
        opcoes: [
            "Qualquer um","Pop","Rock","Indie / Alternativa","R&B / Soul","Rap / Hip-Hop","Samba / Bossa Nova",
            "Jazz","Funk Brasileiro","Axé","Dance","Eletrônica","Disco","Country"
        ],
        desc: null
    },
    {
        titulo: "Selecione um <i>Pya</i>* abaixo",
        opcoes: [
            "Qualquer um","Alegre","Depressivo","Raivoso","Empoderador","Calmo","Animado","Assustador",
            "Apaixonado","Acústico / Confortável","Épico","Nostálgico","Transcendente"
        ],
        desc: "* Um <i>Pya</i> é o estado emocional incentivado ou aliviado por cada música"
    },
    {
        titulo: "Clique em 'ver mais' para descobrir outras músicas com as mesmas características",
        opcoes: null,
        desc: null
    }
]

//Mesma lógica do array de 'navegacao.js'
var perguntas = [DECADA,NACAO,ESTILO,PYA,RESULT];

//Variável que armazena os filtros
var filtros = [];

function passarPerguntas(proxPergunta){
    for(var i = 0; i < perguntas.length; i++){
        if(perguntas[i].id == proxPergunta){ 
            console.log("Passando para pergunta sobre "+perguntas[i].id);
            
            perguntas[i].style = "display: flex";
            //Pegando as infos do JSON e transformando em HTML
            tituloAtual.innerHTML = pesquisa[i].titulo;
            descAtual.innerHTML = pesquisa[i].desc;
            //Parando se já chegou no resultado
            if(perguntas[i].id == RESULT.id){
                darResultados();
                break;
            }
            for(var c = 0; c < pesquisa[i].opcoes.length; c++){
                perguntas[i].innerHTML += `
                <button id="btn${i}${c}"
                    onclick="marcarResposta('${pesquisa[i].opcoes[c]}','${perguntas[i+1].id}')">
                </button>`
                var botaoAtual = document.getElementById(`btn${i}${c}`);
                botaoAtual.innerHTML = pesquisa[i].opcoes[c];
                if(pesquisa[i].titulo == "Selecione uma nacionalidade abaixo"){
                    botaoAtual.innerHTML = pesquisa[i].imagens[c];
                }
            }
        }
        else{
            perguntas[i].style = "display: none";
        }
    }
}

function marcarResposta(resposta, proxPergunta){
    filtros.push(resposta);
    passarPerguntas(proxPergunta);
}

function reiniciarExplorar(){
    filtros = [];
    DECADA.innerHTML = null;
    NACAO.innerHTML = null;
    ESTILO.innerHTML = null;
    PYA.innerHTML = null;
    passarPerguntas('explorarDecada');
}

//Função que entrega os resultados do banco
function darResultados(){
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
    for(var i = 0; i < albuns.length; i++){
        LISTA_albuns.innerHTML += `
        <span>
            <div class="explorarMusica" style="background-image:url('img/albuns/${albuns[i].imagem}.webp');">
                <div class="optDispMusica" id="optDisp${i}"></div>
                <div class="optSalvMusica" id="optSalv${i}"></div>
            </div>
            <h4>${albuns[i].titulo}</h4>
            <p>${albuns[i].artista}</p>
        `;
        var dispensarMusicaAtual = document.getElementById(`optDisp${i}`);
        dispensarMusicaAtual.innerHTML += `
            <i class="fa-solid fa-x"></i>
        `;
        var salvarMusicaAtual = document.getElementById(`optSalv${i}`);
        salvarMusicaAtual.innerHTML += `
            <i class="fa-solid fa-bookmark"></i>
        `;
    }
}