const GRAF_MAIS_OUVIDAS = document.getElementById("graficoMaisOuvidas");
const KPI_POSITIVIDADE = document.getElementById("KPIpositividade");
const GRAF_PYAS = document.getElementById("graficoPyas");
const GRAF_REPRODUCOES = document.getElementById("graficoReproducoes");
const GRAF_ARTISTAS = document.getElementById("graficoArtistas");
const GRAF_PAISES = document.getElementById("graficoPaises");
const GRAF_ESTILOS = document.getElementById("graficoEstilos");

const corPrincipal = ['#623df5d5'];
const corPrincipalTransp = ['#623df53a'];
const paletaCores = ['#623DF5','#CF5443','#D65880','#6CB9BB','#DBAC7E'];
    
Chart.defaults.font.family = "Libre Baskerville";
Chart.defaults.color = "#CF5443";
Chart.defaults.scale.grid.color = corPrincipalTransp;

var maisOuvidas = [];
var datasetsMaisOuvidas = [{data:[],backgroundColor:corPrincipal}];

var pyas = [];
var datasetsPyas = [{data:[],backgroundColor:paletaCores}];

var artistasFavs = [];
var datasetsArtistasFavs = [{data:[],backgroundColor:paletaCores}];

var paisesFavs = [];
var datasetsPaisesFavs = [{data:[],backgroundColor:paletaCores}];

var generosFavs = [];
var datasetsGenerosFavs = [{data:[],backgroundColor:paletaCores}];

var dias = [];
var datasetsReproducoes = [{data:[],
                            borderColor: "#CF5443",
                            backgroundColor:'#623DF5',
                            tension: 0.4}]

function estMaisOuvidas(){
    let erro = false;
    fetch(`estatisticas/maisOuvidas/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                if(json.length >= 5){
                    estanteEstatisticas.style = "display: flex";
                    estatisticasErro.style = "display: none";
                    
                    for (let i = 0; i < json.length; i++) {
                        maisOuvidas.push(json[i].titulo);
                        datasetsMaisOuvidas[0].data.push(json[i].reproducoes);
                    }
                    estPya();
                }
                else{
                    estatisticasErro.style = "display: flex";
                    estanteEstatisticas.style = "display: none";
                                
                    estatisticasErro.innerHTML = `
                        <h2>Calma lá, ${perfil.nome}!<br>Você precisa ouvir no mínimo 10 faixas diferentes para 
                        poder acessar suas estatísticas!</h2>
                        <img src="img/mafematics.jpg">`;
                }
            })
        }
        else if(response.status == 404){
            estatisticasErro.style = "display: flex";
            estanteEstatisticas.style = "display: none";
                        
            estatisticasErro.innerHTML = `
                <h2>Calma lá, ${perfil.nome}!<br>Você precisa ouvir no mínimo 10 faixas diferentes para 
                poder acessar suas estatísticas!</h2>
                <img src="img/mafematics.jpg">`;
        }
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}
function estPya(){
    fetch(`estatisticas/pyas/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    pyas.push(json[i].nome);
                    datasetsPyas[0].data.push(json[i].vezes);
                }
                estArtistasFavs();
            })

        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}
function estArtistasFavs(){
    fetch(`estatisticas/artistasFavoritos/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    artistasFavs.push(json[i].nome);
                    datasetsArtistasFavs[0].data.push(json[i].vezes);
                }
                estPaisesFavs();
            })

        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}
function estPaisesFavs(){
    fetch(`estatisticas/paisesFavoritos/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    switch(json[i].nacionalidade){
                        case 'us':
                            paisesFavs.push("Estados Unidos");
                            break;
                        case 'br':
                            paisesFavs.push("Brasil");
                            break;
                        case 'jp':
                            paisesFavs.push("Japão");
                            break;
                        default:
                            paisesFavs.push((json[i].nacionalidade).toUpperCase());
                            break;
                    }
                    paisesFavs.push();
                    datasetsPaisesFavs[0].data.push(json[i].vezes);
                }
                estEstilosFavs();
            })

        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}
function estEstilosFavs(){
    fetch(`estatisticas/estilosFavoritos/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    generosFavs.push(json[i].genero);
                    datasetsGenerosFavs[0].data.push(json[i].vezes);
                }
                estReproducoes();
            })

        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}
function estReproducoes(){
    fetch(`estatisticas/ultimasReproducoes/${perfil.id}`, {
        cache: 'no-store',
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);

                const font = new FontFace("Libre Baskerville", "url(outros/LibreBaskerville-Regular.ttf)", {
                    style: "normal",
                    weight: "400",
                    stretch: "condensed",
                });
                for (let i = 0; i < json.length; i++) {
                    dias.push(json[i].diaMes);
                    datasetsReproducoes[0].data.push(json[i].vezes);
                }
                let ultimoDado = datasetsReproducoes[0].data[datasetsReproducoes[0].data.length-1];
                if(ultimoDado >= 15){
                    metricaOuvinte.innerHTML = "Especialista musical";
                    metricaImg = "m4.png";
                }
                else if(ultimoDado >= 10){
                    metricaOuvinte.innerHTML = "Fã dedicado";
                    metricaImg.src = "img/m3.png";
                }
                else if(ultimoDado >= 5){
                    metricaOuvinte.innerHTML = "Apreciador de melodias";
                    metricaImg.src = "img/m2.png";
                }
                else{
                    metricaOuvinte.innerHTML = "Ouvinte casua";
                    metricaImg.src = "img/m1.png";
                }
                document.fonts.add(font);
                font.load();

                document.fonts.ready.then(() => {
                    carregarGraficos();
                });
            })

        } 
    }).catch(function (response) {
        window.location = "https://http.cat/500";
    });
}

function carregarGraficos(){
    //------- GRÁFICO DAS MAIS OUVIDAS -------------
    const dadosMaisOuvidas = {
        labels: maisOuvidas,
        datasets: datasetsMaisOuvidas
    }
    const configMaisOuvidas = {
        type: "bar",
        data:dadosMaisOuvidas,
        options: { 
            plugins: { legend: {
                display: false
            }}
        }
    }
    const CONFIG_MAIS_OUVIDAS = new Chart(
        GRAF_MAIS_OUVIDAS, configMaisOuvidas
    );
    //--------- GRÁFICO DOS PYAS --------------
    const dadosPyas = {
        labels: pyas,
        datasets: datasetsPyas
    }
    const configPyas = {
        type: "pie",
        data: dadosPyas,
        options: { 
            plugins: { legend: {
            position: 'bottom'
            }}
        }
    }
    const CONFIG_PYAS = new Chart(
        GRAF_PYAS, configPyas
    )    
    //--------- GRÁFICO DOS ARTISTAS --------------
    const dadosArtistas = {
        labels: artistasFavs,
        datasets: datasetsArtistasFavs
    }
    const configArtistas = {
        type: "pie",
        data: dadosArtistas,
        options: { 
            plugins: { legend: {
            position: 'left'}},
            aspectRatio: '1/4'
        }
    }
    const CONFIG_ARTISTAS = new Chart(
        GRAF_ARTISTAS, configArtistas
    )
    //------- GRÁFICO DOS PAÍSES ------------------
    const dadosPaises = {
        labels: paisesFavs,
        datasets: datasetsPaisesFavs
    }
    const configPaises = {
        type: "pie",
        data: dadosPaises,
        options: { 
            plugins: { legend: {
            position: 'left'}},
            aspectRatio: '1/4'
        }
    }
    const CONFIG_PAISES = new Chart(
        GRAF_PAISES, configPaises
    )
    //------- GRÁFICO DOS ESTILOS ------------------
    const dadosEstilos = {
        labels: generosFavs,
        datasets: datasetsGenerosFavs
    }
    const configEstilos = {
        type: "pie",
        data: dadosEstilos,
        options: { 
            plugins: { legend: {
            position: 'left'}},
            aspectRatio: '1/4'
        }
    }
    const CONFIG_ESTILOS = new Chart(
        GRAF_ESTILOS, configEstilos
    )
    //------- GRÁFICO DAS REPRODUÇÕES ---------
    const dadosReprodcs = {
        labels: dias,
        datasets: datasetsReproducoes
    }
    const configReprodcs = {
        type: "line",
        data: dadosReprodcs,
        options: { 
            plugins: { legend: {
            display: false
            }},
            scales:{
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    const CONFIG_REPRODUCOES = new Chart(
        GRAF_REPRODUCOES, configReprodcs
    )
}