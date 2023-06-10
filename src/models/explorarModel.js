var database = require("../database/config");

function nacionalidades(anoLanc){
    console.log("Explorar passo 1 - ano de laçamento e nacionalidade");
    var command = `
    select distinct nacionalidade as opcao
    from faixa as f
	join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as art on fa.idArtista = art.idArtista
    join album as alb on f.idAlbum = alb.idAlbum
    where anoLanc > ${anoLanc};`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function generos(anoLanc, nacionalidade){
    console.log("Explorar passo 2 - estilo musical");
    var command = `
    select distinct genero as opcao
    from faixa as f
	join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as art on fa.idArtista = art.idArtista
    join album as alb on f.idAlbum = alb.idAlbum
    where anoLanc > ${anoLanc} and nacionalidade = '${nacionalidade}';`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function pyas(anoLanc, nacionalidade, genero){
    console.log("Explorar passo 3 - pya");
    var command = `
    select distinct p.nome as opcao
    from faixa as f
        join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as art on fa.idArtista = art.idArtista
    join album as alb on f.idAlbum = alb.idAlbum
    join pyafaixa pf on f.idFaixa = pf.idFaixa
    join pya as p on pf.idPya = p.idPya
    where anoLanc > ${anoLanc} and nacionalidade = '${nacionalidade}' and genero = '${genero}';`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

function resultados(anoLanc, nacionalidade, genero, pya){
    console.log("Explorar passo 4 - resultados");
    var command = `
    select distinct f.*
    from faixa as f
    join faixaartista as fa on f.idFaixa = fa.idFaixa
    join artista as art on fa.idArtista = art.idArtista
    join album as alb on f.idAlbum = alb.idAlbum
    join pyafaixa pf on f.idFaixa = pf.idFaixa
    join pya as p on pf.idPya = p.idPya
    where anoLanc > ${anoLanc} and nacionalidade = '${nacionalidade}' and genero = '${genero}' and p.nome = '${pya}';`;
    console.log("Comando: \n"+command);
    return database.execute(command);
}

module.exports = {
    nacionalidades,
    generos,
    pyas,
    resultados
};