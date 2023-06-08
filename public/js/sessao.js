//JSON pegando as informações do session storage
perfil = {
    id: sessionStorage.ID_USUARIO,
    nome: sessionStorage.NOME_USUARIO,
    avatar: sessionStorage.AVATAR_USUARIO,
    email: sessionStorage.EMAIL_USUARIO,
    maioridade: true, //Temporário
    pronomes: sessionStorage.PRONOME_USUARIO
}

function carregarPerfil(){
    const NOME = document.getElementById("nomePerfil");
    const AVATAR = document.getElementById("avatarPerfil");

    NOME.innerHTML = perfil.nome;
    AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
}

function encerrarSessao(){
    sessionStorage.ID_USUARIO = undefined;
    sessionStorage.NOME_USUARIO = undefined;
    sessionStorage.DATA_NASC_USUARIO = undefined;
    sessionStorage.PRONOME_USUARIO = undefined;
    sessionStorage.EMAIL_USUARIO = undefined;

    window.location = "index.html";
}