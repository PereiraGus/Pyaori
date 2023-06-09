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

function carregarInfosPerfil() {
    INP_CONFIG_NOME.value = perfil.nome;
    INP_CONFIG_EMAIL.value = perfil.email;

    ICON_CONFIG_MAIORIDADE.className = "fa-solid";
    if (perfil.maioridade) {
        ICON_CONFIG_MAIORIDADE.className += " fa-check";
    }
    else {
        ICON_CONFIG_MAIORIDADE.className += " fa-x";
    }

    SLCT_CONFIG_PRONOMES.innerHTML = "";
    var pronomes = ["Ela", "Ele", "Elu"];
    for (var i = 0; i < pronomes.length; i++) {
        if (pronomes[i] == perfil.pronomes) {
            SLCT_CONFIG_PRONOMES.innerHTML += `
                <option value=${pronomes[i]} selected="selected">${pronomes[i]}</option>
            `
        }
        else {
            SLCT_CONFIG_PRONOMES.innerHTML += `
                <option value=${pronomes[i]}>${pronomes[i]}</option>
            `
        }
    }
    alterarModo(false);
}

function alterarModo(editar) {
    if (editar == false) {
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
    else {
        INP_CONFIG_NOME.disabled = false;
        BTN_CONFIG_AVATAR.style = "display: block";
        INP_CONFIG_EMAIL.disabled = false;
        DIV_CONFIG_SENHA.style = "display: none";
        AVISO_CONFIG_MAIORIDADE.style = "display: block";
        SLCT_CONFIG_PRONOMES.disabled = false;
        BTN_ALTERAR_MODO.innerHTML = `
            <button onclick="salvarAlteracoes()" class="btnSalvarConfig">Salvar<br>alterações</button>
        `;
    }
}

const MODAL_SENHA = document.getElementById("modalSenha");
const MODAL_AVATAR = document.getElementById("modalAvatar");

function abrirModalSenha() {
    MODAL_SENHA.style = "visibility: visible";
}
function fecharModalSenha() {
    MODAL_SENHA.style = "visibility: hidden";
}

function abrirModalAvatar() {
    MODAL_AVATAR.style = "visibility: visible";
}
function escolherAvatar(index, img) {
    fetch(`usuario/trocarAvatar/${perfil.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sAvatar: index,
        })
    }).then(function (response) {
        console.log("Resposta:\n", response);
        if (response.ok) {
            img.style = "animation: girar 1s linear alternate";
            falaAvatar(index, true);

            let sfx = new Audio();
            sfx.src = "sfx/Escolher avatar.wav";
            sfx.play();

            sessionStorage.AVATAR_USUARIO = index;
            carregarPerfil();

            setTimeout(() => {
                IMG_CONFIG_AVATAR.src = "img/avatares/" + perfil.avatar + ".webp";
                IMG_CONFIG_AVATAR.style = "animation: cairDoCeu 1s linear alternate";
            },1000)
            setTimeout(() => {
                IMG_CONFIG_AVATAR.style = "";
            },2000)
        }
        else if (response.status == 404) {
            alert("Avatar inválido. Escolha outro ou tente novamente mais tarde")
        }
        else {
            window.location = `https://http.cat/${response.status}`;
        }
    }).catch(function (response) {
        console.log("ERRO: ", response);
    });
    
    setTimeout(() => {
        img.style = "";
        MODAL_AVATAR.style = "visibility: hidden";
    },1000)
}

function falaAvatar(avatar, final){
    let fala = new Audio();
    fala.volume = 0.7;

    let tresFalas = [1,2,4,6,8,11,12];
    let quatroFalas = [3,5,7,9,10];
    let opcao = 0;

    if(tresFalas.includes(avatar)){
        if(final){
            opcao = 3;
        }
        else{
            opcao = Number((Math.random()+1).toFixed(0));
        }
    }
    else if(quatroFalas.includes(avatar)){
        if(final){ 
            opcao = 4;
        }
        else{
            opcao = Number((Math.random()*2+1).toFixed(0));
        }
    }
    
    fala.src = `sfx/avatares/${avatar}/${opcao}.wav`;
    fala.play();
}

function salvarAlteracoes() {
    let nickname = INP_CONFIG_NOME.value;
    let email = INP_CONFIG_EMAIL.value;
    let pronomes = SLCT_CONFIG_PRONOMES.value;

    let alvo = [];
    let mensagem = [];

    if (email.length > 60) {
        alvo.push(INP_CONFIG_EMAIL);
        mensagem.push("O email deve ter no máximo 60 caracteres.");
    }
    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        alvo.push(INP_CONFIG_EMAIL);
        mensagem.push("Digite um email válido.");
    }
    if (nickname.length > 15 || nickname.length < 3) {
        alvo.push(INP_CONFIG_NOME);
        mensagem.push("O nome de usuário deve ter entre 3 e 15 caracteres.");
    }

    if (alvo.length == 0) {
        fetch(`usuario/atualizar/${perfil.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sNickname: nickname,
                sEmail: email,
                sPronomes: pronomes,
            })
        }).then(function (response) {
            console.log("Resposta:\n", response);
            if (response.ok) {
                alert("Alterações salvas com sucesso");
                sessionStorage.NOME_USUARIO = INP_CONFIG_NOME.value;
                sessionStorage.EMAIL_USUARIO = INP_CONFIG_EMAIL.value;
                sessionStorage.PRONOME_USUARIO = SLCT_CONFIG_PRONOMES.value;
                carregarPerfil();
                alterarModo(false);
            }
            else if (response.status == 409) {
                response.json().then(json => {
                    if (json == "Email") {
                        marcarErro([inpEmailUp], [`${json} já utilizado.`]);
                    }
                    else if (json == "Nome de usuário") {
                        marcarErro([inpNickname], [`${json} já utilizado.`]);
                    }
                    else {
                        window.location = "https://http.cat/500";
                    }
                });
            }
            else {
                window.location = `https://http.cat/${response.status}`;
            }
        }).catch(function (response) {
            console.log("ERRO: ", response);
        });
    }
    else {
        erroConfigs(alvo, mensagem);
    }
}

function erroConfigs(alvo, mensagem) {
    for (let i = 0; i < alvo.length; i++) {
        alvo[i].className += " erro";
    }
    let mensagemAlerta = "";
    for (let i = 0; i < mensagem.length; i++) {
        mensagemAlerta += mensagem[i] + "\n";
    }
    alert(mensagemAlerta);
    setTimeout(() => {
        for (let i = 0; i < alvo.length; i++) {
            alvo[i].className = alvo[i].className.replace(" erro", "");
        }
    }, 5000)
}

function alterarSenha(){
    let senhaAntiga = inpSenhaAntiga.value;
    let senhaNova =inpSenhaNova.value;

    let alvo = [];
    let mensagem = [];

    if(senhaNova > 15 || senhaNova < 8){
        alvo.push(inpSenhaNova);
        mensagem.push("A nova senha deve ter entre 8 e 15 caracteres.");
    }
    let maisculas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let minusculas = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let numerais = [0,1,2,3,4,5,6,7,8,9]
    let especiais = ["!","@","#","$",".","%","*","&"]
    
    let caracteresObrigatorios = [maisculas,minusculas,numerais,especiais];
    let atendeOsRequisitos = [false, false, false, false];
    for (let i = 0; i < caracteresObrigatorios.length; i++) {
        for (let c = 0; c < caracteresObrigatorios[i].length; c++) {
            if(senhaNova.indexOf(caracteresObrigatorios[i][c]) != -1){
                atendeOsRequisitos[i] = true;
            }
        }
    }
    for (let i = 0; i < atendeOsRequisitos.length; i++) {
        if(!atendeOsRequisitos[i]){
            alvo.push(inpSenhaNova);
            mensagem.push("A nova senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.");
            break;
        }
    }

    if(senhaNova == senhaAntiga){
        alvo.push(inpSenhaNova);
        alvo.push(inpSenhaAntiga);
        mensagem.push("As senhas são iguais");
    }

    if(alvo.length == 0){
        fetch(`usuario/trocarSenha/${perfil.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senhaAntiga: senhaAntiga,
                senhaNova: senhaNova
            })
        }).then(function (response) {
            console.log("Resposta:\n", response);
            if (response.ok) {
                alert("Senha alterada com sucesso");
                                
                inpSenhaAntiga.value = "";
                inpSenhaNova.value = "";
                
                fecharModalSenha();
            }
            else if (response.status == 400) {
                erroConfigs([inpSenhaAntiga],["Senha atual incorreta"]);
            }
            else {
                window.location = `https://http.cat/${response.status}`;
            }
        }).catch(function (response) {
            console.log("ERRO: ", response);
        });
    }
    else{
        erroConfigs(alvo, mensagem);
    }
}