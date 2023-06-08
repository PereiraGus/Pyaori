const GRAF_MAIS_OUVIDAS = document.getElementById("graficoMaisOuvidas");
const KPI_POSITIVIDADE = document.getElementById("KPIpositividade");
const GRAF_PYAS = document.getElementById("graficoPyas");
const GRAF_REPRODUCOES = document.getElementById("graficoReproducoes");
const GRAF_ARTISTAS = document.getElementById("graficoArtistas");
const GRAF_PAISES = document.getElementById("graficoPaises");
const GRAF_ESTILOS = document.getElementById("graficoEstilos");

const font = new FontFace("Libre Baskerville", "url(outros/LibreBaskerville-Regular.ttf)", {
    style: "normal",
    weight: "400",
    stretch: "condensed",
});
document.fonts.add(font);
font.load();
document.fonts.ready.then(() => {
    carregarGraficos();
});

function carregarGraficos(){
    const corPrincipal = ['#623df5d5'];
    const corPrincipalTransp = ['#623df53a'];
    const paletaCores = ['#623DF5','#CF5443','#D65880','#6CB9BB','#DBAC7E'];
    
    Chart.defaults.font.family = "Libre Baskerville";
    Chart.defaults.color = "#CF5443";
    Chart.defaults.scale.grid.color = corPrincipalTransp;

    //------- GRÁFICO DAS MAIS OUVIDAS -------------
    const maisOuvidas = ['MANiCURE','Applause','Aura','Stay with me','Quem me dera','Ai-Wa Energy','Todo Mundo (menos eu)','Cor','Say So/Like That','Bad Girls'];
    const reprodcsMaisOuvidas = [47,31,29,20,18,13,9,6,4,2]
    const dadosMaisOuvidas = {
        labels: maisOuvidas,
        datasets: [{
            data: reprodcsMaisOuvidas,
            backgroundColor: corPrincipal
        }]
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
    const pyas = ['Alegre','Animado','Raivoso','Transcendente','Depressivo'];
    const qtdPyas = [17,12,8,4,2];
    const dadosPyas = {
        labels: pyas,
        datasets: [{
            data: qtdPyas,
            backgroundColor: paletaCores
        }]
    }
    const configPyas = {
        type: "pie",
        data: dadosPyas,
        options: { 
            plugins: { legend: {
            position: 'bottom'
            }},
            aspectRatio: '4/2'
        }
    }
    const CONFIG_PYAS = new Chart(
        GRAF_PYAS, configPyas
    )    
    //--------- GRÁFICO DOS ARTISTAS --------------
    const artistas = ['Lady Gaga','Lou Garcia','Ana Vitória','Miki Matsubara','Outros'];
    const qtdArtistas = [22,19,10,8,39];
    const dadosArtistas = {
        labels: artistas,
        datasets: [{
            data: qtdArtistas,
            backgroundColor: paletaCores
        }]
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
    const paises = ['Brasil','EUA','Japão','França','Outros'];
    const qtdPaises = [42,38,5,6,4];
    const dadosPaises = {
        labels: paises,
        datasets: [{
            data: qtdPaises,
            backgroundColor: paletaCores
        }]
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
    const estilos = ['Pop','Alternativa','Dance','Samba','Outros'];
    const qtdEstilos = [55,32,12,8,4];
    const dadosEstilos = {
        labels: estilos,
        datasets: [{
            data: qtdEstilos,
            backgroundColor: paletaCores
        }]
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
    const dias = ['06/05','07/05','08/05','09/05','10/05','11/05','12/05'];
    const qtdReprodcs = [2,4,8,3,0,6,5];
    const dadosReprodcs = {
        labels: dias,
        datasets: [{
            data: qtdReprodcs,
            borderColor: corPrincipal,
            tension: 0.5,
            pointStyle: 'star'
        }]
    }
    const configReprodcs = {
        type: "line",
        data: dadosReprodcs,
        options: { 
            plugins: { legend: {
            display: false
            }}
        }
    }
    const CONFIG_REPRODUCOES = new Chart(
        GRAF_REPRODUCOES, configReprodcs
    )
}