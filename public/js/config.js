const INP_CONFIG_NOME = document.getElementById("inpNome");
const IMG_CONFIG_AVATAR = document.getElementById("imgAvatarConfig");
const BTN_CONFIG_AVATAR = document.getElementById("btnAvatarConfig");
const INP_CONFIG_EMAIL = document.getElementById("inpEmail");
const DIV_CONFIG_SENHA = document.getElementById("divSenhaConfig");
const ICON_CONFIG_MAIORIDADE = document.getElementById("iconMaioridade");
const AVISO_CONFIG_MAIORIDADE = document.getElementById("avisoMaioridade");
const SLCT_CONFIG_PRONOMES = document.getElementById("pronomesConfig");
const BTN_ALTERAR_MODO = document.getElementById("btnEditarConfig");

var houveAlteracao = false;

function carregarInfosPerfil(){
    INP_CONFIG_NOME.value = perfil.nome;
    INP_CONFIG_EMAIL.value = perfil.email;
    
    ICON_CONFIG_MAIORIDADE.className = "fa-solid";
    if(perfil.maioridade){
        ICON_CONFIG_MAIORIDADE.className += " fa-check";
    }
    else{
        ICON_CONFIG_MAIORIDADE.className += " fa-x";
    }
    
    SLCT_CONFIG_PRONOMES.innerHTML = "";
    var pronomes = ["Ela","Ele","Elu"];
    for(var i = 0; i < pronomes.length; i++){
        if(pronomes[i] == perfil.pronomes){
            SLCT_CONFIG_PRONOMES.innerHTML += `
                <option value=${pronomes[i]} selected="selected">${pronomes[i]}</option>
            `
        }
        else{
            SLCT_CONFIG_PRONOMES.innerHTML += `
                <option value=${pronomes[i]}>${pronomes[i]}</option>
            `
        }
    }
    alterarModo(false);
}

function alterarModo(editar){
    if(editar == false){
        salvarAlteracoes();
        INP_CONFIG_NOME.disabled = true;
        IMG_CONFIG_AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
        BTN_CONFIG_AVATAR.style = "display: none";
        INP_CONFIG_EMAIL.disabled = true;
        DIV_CONFIG_SENHA.style = "display: flex";
        AVISO_CONFIG_MAIORIDADE.style = "display: none";
        SLCT_CONFIG_PRONOMES.disabled = true;
        BTN_ALTERAR_MODO.innerHTML = `
            <button onclick="alterarModo(true)">Editar</button>
        `;
    }
    else{
        INP_CONFIG_NOME.disabled = false;
        BTN_CONFIG_AVATAR.style = "display: block";
        INP_CONFIG_EMAIL.disabled = false;
        DIV_CONFIG_SENHA.style = "display: none";
        AVISO_CONFIG_MAIORIDADE.style = "display: block";
        SLCT_CONFIG_PRONOMES.disabled = false;
        BTN_ALTERAR_MODO.innerHTML = `
            <button onclick="alterarModo(false)" class="btnSalvarConfig">Salvar<br>alterações</button>
        `;
    }   
}

const MODAL_SENHA = document.getElementById("modalSenha");
const MODAL_AVATAR = document.getElementById("modalAvatar");

function abrirModalSenha(){
    MODAL_SENHA.style = "visibility: visible";
}
function fecharModalSenha(){
    MODAL_SENHA.style = "visibility: hidden";
}

function abrirModalAvatar(){
    MODAL_AVATAR.style = "visibility: visible";
}
function escolherAvatar(index){
    perfil.avatar = index;
    carregarPerfil();
    IMG_CONFIG_AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
    MODAL_AVATAR.style = "visibility: hidden";
}

function salvarAlteracoes(){
    perfil.nome = INP_CONFIG_NOME.value;
    perfil.email = INP_CONFIG_EMAIL.value;
    perfil.pronomes = SLCT_CONFIG_PRONOMES.value;
    carregarPerfil();
}

function encerrarSessao(){
    sessionStorage.NOME_USUARIO = undefined;
    sessionStorage.DATA_NASC_USUARIO = undefined;
    sessionStorage.PRONOME_USUARIO = undefined;
    sessionStorage.EMAIL_USUARIO = undefined;

    window.location = "index.html";
}