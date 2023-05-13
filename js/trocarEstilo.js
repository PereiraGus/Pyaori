//JS que troca o estilo do body/aside para adequar à página
const BODY = document.getElementsByTagName("body")[0];
const ASIDE = document.getElementsByTagName("aside")[0];

function trocarEstilo(pagina){
    var novoBody = "body"+pagina;
    var novoAside = "aside"+pagina;

    BODY.className = novoBody;
    ASIDE.className = novoAside;

    if(pagina == "explorar"){
        imgLinkInicio.src = "svgs/butterflyLight.svg"
        imgLinkEstante.src = "img/discoClaro.png"
    }
    else{
        imgLinkInicio.src = "svgs/butterflyDark.svg"
        imgLinkEstante.src = "img/discoEscuro.png"
    }
}