if(sessionStorage.ID_USUARIO != undefined){
    window.location = "main.html";
}

function marcarErro(alvo, mensagem){
    for (let i = 0; i < alvo.length; i++) {
        alvo[i].className += " erro";
    }
    mensagensErro.innerHTML = "";
    for (let i = 0; i < mensagem.length; i++) {
        let erro = document.createElement("p");
        erro.innerText = mensagem[i];
        mensagensErro.appendChild(erro);
    }
    mensagensErro.style = "visibility: visible; animation-name: aparecer";
    
    setTimeout(() => {
        for (let i = 0; i < alvo.length; i++) {
            alvo[i].className = alvo[i].className.replace(" erro", "");
            mensagensErro.style = "visibility: visible;";
        }
    }, 5000)

    setTimeout(() => {
        mensagensErro.style = "visibility: visible; animation-name: aparecer; animation-direction: reverse";
    }, 6000)
    setTimeout(() => {
        mensagensErro.style = "";
    }, 7000)
}

function cadastro(){
    let email = inpEmailUp.value;
    let nickname = inpNickname.value;
    let dataNasc = inpDataNasc.value;
    let pronomes = slctPronome.value;
    let senha = inpPassUp.value;
    let confSenha = inpConfPass.value;

    //Variáveis de validação
    let alvo = []; //A input a ser marcada quando disparar um erro
    let mensagem = []; //A mensagem de cada erro

    if(email.length > 60){
         alvo.push(inpEmailUp);
         mensagem.push("O email deve ter no máximo 60 caracteres.");
    }
    if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
         alvo.push(inpEmailUp);
         mensagem.push("Digite um email válido.");
    }
    if(nickname.length > 15 || nickname.length < 3){
        alvo.push(inpNickname);
        mensagem.push("O nome de usuário deve ter entre 3 e 15 caracteres.");
    }
    if(dataNasc.length != 10){
        alvo.push(inpDataNasc);
        mensagem.push("Digite uma data de nascimento válida.");
    }
    if(senha.length > 15 || senha.length < 8){
        alvo.push(inpPassUp);
        mensagem.push("A senha deve ter entre 8 e 15 caracteres.");
    }
    let maisculas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let minusculas = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    let numerais = [0,1,2,3,4,5,6,7,8,9]
    let especiais = ["!","@","#","$",".","%","*","&"]
    
    let caracteresObrigatorios = [maisculas,minusculas,numerais,especiais];
    let atendeOsRequisitos = [false, false, false, false]; //Um booleano para cada um dos requisitos (respectivos na variavel 'caracteresObrigatorios')

    for (let i = 0; i < caracteresObrigatorios.length; i++) { //Para cada uma dos 4 requisitos da senha o código verifica se
        for (let c = 0; c < caracteresObrigatorios[i].length; c++) { // cada um dos caracteres possíveis ("A","B","C",.... para maiúsculas)
            if(senha.indexOf(caracteresObrigatorios[i][c]) != -1){ // está presente naquela senha.
                atendeOsRequisitos[i] = true; // Se estiverem, um índice de 'atendeOsRequisitos' respectivo à aquele requisito será true
            }
        }
    }
    for (let i = 0; i < atendeOsRequisitos.length; i++) { //E então verifica se existe um requisito false
        if(!atendeOsRequisitos[i]){
            alvo.push(inpPassUp);
            mensagem.push("A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.");
            break;
        }
    }

    if(senha != confSenha){
        alvo.push(inpPassUp);
        alvo.push(inpConfPass);
        mensagem.push("As senhas não coincidem");
    }

    if(alvo.length == 0){ //Se não tiver nenhuma input pra marcar (nenhum erro)
        fetch("usuario/cadastro",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sNickname: nickname,
                sDataNasc: dataNasc,
                sPronomes: pronomes,
                sEmail: email,
                sSenha: senha
            })
        }).then(function(response){
            console.log("Resposta:\n", response);
            if(response.ok){
                alert("Cadastro efetuado com sucesso!");
                trocarAba(true);
            }
            else if(response.status == 409){
                response.json().then(json => {
                    if(json == "Email"){
                        marcarErro([inpEmailUp],[`${json} já utilizado.`]);
                    }
                    else if(json == "Nome de usuário"){
                        marcarErro([inpNickname],[`${json} já utilizado.`]);
                    }
                    else{
                        window.location = "https://http.cat/500";
                    }
                });
            }
            else{
                window.location = `https://http.cat/${response.status}`;
            }
        }).catch(function(response){
            console.log("ERRO: ", response);
        });
    }
    else{
        marcarErro(alvo, mensagem);
    }
}

function login(){
    let email = inpEmailIn.value;
    let senha = inpPassIn.value;

    let alvo = [];
    let mensagem = [];

    if(email.length > 60){
         alvo.push(inpEmailIn);
         mensagem.push("O email deve ter no máximo 60 caracteres.");
    }
    if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
         alvo.push(inpEmailIn);
         mensagem.push("Digite um email válido.");
    }
    if(senha.length > 15 || senha.length < 8){
        alvo.push(inpPassIn);
        mensagem.push("A senha deve ter entre 8 e 15 caracteres.");
    }

    if(alvo.length == 0){
        fetch("usuario/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sEmail: email,
                sSenha: senha
            })
        }).then(function(response){
            console.log("Resposta:\n", response);
            if(response.ok){response.json().then(json => {
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_USUARIO = json.nickname;
                sessionStorage.DATA_NASC_USUARIO = json.dataNasc;
                sessionStorage.PRONOME_USUARIO = json.pronomes;
                sessionStorage.AVATAR_USUARIO = json.avatar;
                sessionStorage.EMAIL_USUARIO = json.email;

                trocarAba(false);

                setTimeout(() => {
                    window.location = "main.html";
                },750);
            });
            }
            else if(response.status == 404){
                marcarErro([inpEmailIn, inpPassIn],["Email ou senha inválidos"])
            }
            else{
                console.log("Houve um erro ao tentar realizar o login!");
            }
        }).catch(function(error){
            console.log(error);
        });
    }
    else{
        marcarErro(alvo, mensagem);
    }
}