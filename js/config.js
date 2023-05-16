const INP_CONFIG_NOME = document.getElementById("inpNome");
const INP_CONFIG_EMAIL = document.getElementById("inpEmail");
const ICON_CONFIG_MAIORIDADE = document.getElementById("iconMaioridade");
const SLCT_CONFIG_PRONOMES = document.getElementById("pronomesConfig");

function carregarInfosPerfil(){
    INP_CONFIG_NOME.value = perfil.nome;
    INP_CONFIG_NOME.disable = true;
    INP_CONFIG_EMAIL.value = perfil.email;
    INP_CONFIG_EMAIL.disable = true;
    ICON_CONFIG_MAIORIDADE.className = "fa-solid";
    if(perfil.maioridade){
        ICON_CONFIG_MAIORIDADE.className += " fa-check";
    }
    else{
        ICON_CONFIG_MAIORIDADE.className += " fa-x";
    }
    
    var pronomes = ["Ela/Dela","Ele/Dele","Elu/Delu"];
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
}