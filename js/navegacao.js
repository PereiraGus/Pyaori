//Arquivo que irá controlar a navegação entre as páginas do site.
//As divs de cada tela é absorvida pelas constantes abaixo
const INICIO = document.getElementById("inicio");
const ALBUM = document.getElementById("album");
const ARTISTA = document.getElementById("artista");
const EXPLORAR = document.getElementById("explorar");
const ESTANTE = document.getElementById("estante");
const CONFIGS = document.getElementById("configs");

//O array "paginas" guarda todas as constantes, afim de automatizar sua checagem abaixo
var paginas = [INICIO,ALBUM,ARTISTA,EXPLORAR,ESTANTE,CONFIGS];

function trocarPagina(paginaDeDestino){
    for(var i = 0; i < paginas.length; i++){
        if(paginas[i].id == paginaDeDestino){
            paginas[i].style = "display: flex";
            console.log("Você foi para a página "+paginas[i].id);
            //Chamando a função inicial de cada tela apenas quando forem selecionadas
            switch (paginas[i].id) {
                case 'explorar':
                    reiniciarExplorar();
                    break;
            }
            //Customizando o estilo do body/aside de acordo com a tela selecionada
            trocarEstilo(paginas[i].id);
        }
        else{
            paginas[i].style = "display: none";
        }
    }
}
//O display de uma div é carregado se o ID dela for igual ao parâmetro informado
//quando o método é chamado. Se não, esta div é ocultada, o que limpa a tela e
//deixa espaço apenas para a div desejada.

trocarPagina("inicio");
//Inicia-se a função na primeira vez em que se carrega o HTML, para aparecer
//primeiramente a página de início