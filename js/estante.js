/*JS que vai trocar as abas de explorar*/
const SALVOS = document.getElementById("estanteSalvos");
const ESTATISTICAS = document.getElementById("estanteEstatisticas");
const CONFIGS = document.getElementById("configs");

const ABA_SALVOS = document.getElementById("abaSuaEstante");
const ABA_ESTATISTICAS = document.getElementById("abaEstatisticas");

var abas = [SALVOS,ESTATISTICAS,CONFIGS];

function trocarAba(abaDestino){
    linkSuporteTecnico.style = "display: none";
    for(var i = 0; i < abas.length; i++){
        if(abas[i].id == abaDestino){
            switch (abaDestino) {
                case 'estanteSalvos':
                    ABA_SALVOS.className = null;
                    ABA_ESTATISTICAS.className = "abaInativa";
                    carregarSalvos();
                    break;
                case 'estanteEstatisticas':
                    ABA_SALVOS.className = "abaInativa";
                    ABA_ESTATISTICAS.className = null;
                    break;
                case 'configs':
                    ABA_SALVOS.className = "abaInativa";
                    ABA_ESTATISTICAS.className = "abaInativa";
                    linkSuporteTecnico.style = "display: flex";
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
    //Array de JSONs provisório até a conexão com o banco
    var musicas = [
        {
            imagem: null,
            titulo: "successful",
            artista: "Ariana Grande"
        },
        {
            imagem: null,
            titulo: "POV",
            artista: "Ariana Grande"
        },
        {
            imagem: null,
            titulo: "1000 doves",
            artista: "Lady Gaga"
        }
    ]
    for(var i = 0;i < musicas.length; i++){
        SALVOS.innerHTML += `
            <span>
                <img src="${musicas[i].imagem}">
                <h4>${musicas[i].titulo}</h4>
                <p>${musicas[i].artista}</p>
            </span>
        `
    }
}