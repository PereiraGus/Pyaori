/*JS que vai tratar as escolhas do usuário na aba explorar*/
const DECADA = document.getElementById("explorarDecada");
const NACAO = document.getElementById("explorarNacionalidade");
const ESTILO = document.getElementById("explorarEstilo");
const PYA = document.getElementById("explorarPya");
const RESULT = document.getElementById("explorarResultados");
const TITULO_GUIA = document.getElementById("explorarTitulo");
const LISTA_FAIXAS = document.getElementById("explorarListaDeMusicas");

//Variáveis para adaptar o título e descrição da pergunta
var tituloAtual = document.getElementById("perguntaTitulo");
var descAtual = document.getElementById("perguntaDesc");

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

var varAnoMax = 0;
function marcarResposta(resposta) {
    filtros[respondidas] = resposta;
    respondidas++;

    switch(respondidas){
        case 0:
            tituloAtual.innerHTML = "Selecione uma época abaixo:";
            break;
        case 1:
            tituloAtual.innerHTML = "Selecione um país abaixo:";
            break;
        case 2:
            tituloAtual.innerHTML = "Selecione um gênero musical abaixo:";
            break;
        case 3:
            tituloAtual.innerHTML = "Selecione um sentimento abaixo:";
            break;
    }
    if(filtros[1] == ""){
        switch(filtros[0]){
            case 1940:
                varAnoMax = 1969;
                break;
            case 1970:
                varAnoMax = 1999
                break;
            case 2000:
                varAnoMax = 2009
                break;
            case 0:
            case 2010:
                let anoAtual = new Date().getFullYear();
                varAnoMax = anoAtual
                break;
        }
    }
    buscarOpcoes();
}

function buscarOpcoes(){    
    fetch(`explorar/passo${respondidas}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                anoMin: filtros[0],
                anoMax: varAnoMax,
                nacionalidade: filtros[1],
                genero: filtros[2],
                pya: filtros[3],
                idUsuario: perfil.id
            })
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                if(filtros[3] == ""){
                    for (var c = 0; c < json.length; c++) {
                        if(c == 0){
                            perguntas[respondidas].innerHTML += `
                            <button id="btn%${c}"
                                onclick="marcarResposta('%')">
                                Qualquer um
                            </button>`
                        }
                        if(respondidas == 1){
                            perguntas[respondidas].innerHTML += `
                            <button id="btn${respondidas+1}${c}"
                                onclick="marcarResposta('${json[c].opcao}')">
                                <img class="bandeira" src="https://flagcdn.com/60x45/${json[c].opcao}.png">
                            </button>`
                        }
                        else{
                            perguntas[respondidas].innerHTML += `
                            <button id="btn${respondidas+1}${c}"
                                onclick="marcarResposta('${json[c].opcao}')">
                                ${json[c].opcao}
                            </button>`
                        }
                    }
                }   
                else{
                    darResultados(json);
                }
            })
        }
        else{
            if(response.status == 404){
                tituloAtual.innerHTML = "0 resultados restantes";
                perguntas[respondidas].style = "display: none";
                RESULT.style = "display: flex";
                explorarListaDeMusicas.innerHTML = "<p style='text-align: center'>Todos os álbuns existentes com essas características já foram salvos ou dispensados. Para verificar os salvos, acesse a aba 'Sua Estante'</p>";
                console.warn("Nenhum álbum encontrada");
            }
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
    passarPerguntas();
}

function reiniciarExplorar() {
    filtros = ["", "", "", ""];
    respondidas = 0;
    NACAO.innerHTML = null;
    ESTILO.innerHTML = null;
    PYA.innerHTML = null;
    LISTA_FAIXAS.innerHTML = null;
    RESULT.style = "display: none";
    passarPerguntas('explorarDecada');
}

//Função que entrega os resultados do banco
function darResultados(result) {
    console.log(`Resultados: ${filtros}`);
    TITULO_GUIA.innerHTML = "Resultados";
    tituloAtual.innerHTML = result.length + " resultados encontrados";
    LISTA_FAIXAS.innerHTML = "";
    if(result.length >3){
        btnVerMais.style = "display: block";
    }
    else{
        btnVerMais.style = "display: none";
    }

    let faixas = [];
    let numsSorteados = [];
    for (let i = 0; i < 3; i++) {
        let sorteioUnico = false;
        while(!sorteioUnico){
            var sorteio = Number((Math.random()*2).toFixed());
            if(!(numsSorteados.includes(sorteio))){
                numsSorteados.push(sorteio);
                sorteioUnico = true;
            }
        }
        if(result[sorteio] != undefined){
            faixas.push(result[sorteio]);
        }
    }

    for (let i = 0; i < faixas.length; i++) {
        LISTA_FAIXAS.innerHTML += `
        <span id="spanMusica${i+1}">
            <div class="explorarMusica" style="background-image:url('img/albuns/${faixas[i].idAlbum}.webp');">
                <div class="optDispMusica" id="optDisp${i}" onclick="salvarOuDispensar(${i+1},${faixas[i].idAlbum},'D')">
                    <i class="fa-solid fa-x"></i>
                </div>
                <div class="optSalvMusica" id="optSalv${i}" onclick="salvarOuDispensar(${i+1},${faixas[i].idAlbum},'S')">
                    <i class="fa-solid fa-bookmark"></i>
                </div>
            </div>
            <h4>${faixas[i].titulo}</h4>
            <p>${faixas[i].artista}</p>
        `;
    }
}

function salvarOuDispensar(spanMusica, varIdAlbum, varSalvarDispensar){
    let varIdUsuario = perfil.id;
    fetch(`interacoes/salvarOuDispensar`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idUsuario: varIdUsuario,
                idAlbum: varIdAlbum,
                salvarDispensar: varSalvarDispensar
            })
    }).then(function (response) {
        if (response.ok) {
            let spanAlvo = document.getElementById("spanMusica"+spanMusica);
            LISTA_FAIXAS.removeChild(spanAlvo);
            buscarOpcoes();
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}