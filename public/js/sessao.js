//Se o usuário não estiver logado, é redirecionado para a index
if(sessionStorage.ID_USUARIO == undefined){
    window.location = "index.html";
}

//JSON pegando as informações do session storage
var anoAtual = new Date().getFullYear();
var idade = anoAtual - Number(String(sessionStorage.DATA_NASC_USUARIO).slice(0,4));
var maiorDeIdade = idade >= 18;

var perfil = {
    id: sessionStorage.ID_USUARIO,
    nome: sessionStorage.NOME_USUARIO,
    avatar: sessionStorage.AVATAR_USUARIO,
    email: sessionStorage.EMAIL_USUARIO,
    maioridade: maiorDeIdade,
    pronomes: sessionStorage.PRONOME_USUARIO
}

function carregarPerfil(){
    perfil = {
        id: sessionStorage.ID_USUARIO,
        nome: sessionStorage.NOME_USUARIO,
        avatar: sessionStorage.AVATAR_USUARIO,
        email: sessionStorage.EMAIL_USUARIO,
        maioridade: maiorDeIdade,
        pronomes: sessionStorage.PRONOME_USUARIO
    }

    const NOME = document.getElementById("nomePerfil");
    const AVATAR = document.getElementById("avatarPerfil");

    NOME.innerHTML = perfil.nome;
    AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
}
carregarPerfil();

function encerrarSessao(){
    sessionStorage.ID_USUARIO = undefined;
    sessionStorage.NOME_USUARIO = undefined;
    sessionStorage.DATA_NASC_USUARIO = undefined;
    sessionStorage.PRONOME_USUARIO = undefined;
    sessionStorage.EMAIL_USUARIO = undefined;

    window.location = "index.html";
}