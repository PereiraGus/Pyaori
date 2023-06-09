/*
drop database pyaoriDb;
*/
create database pyaoriDb;
use pyaoriDb;

create table artista(
	idArtista int primary key auto_increment,
    nome varchar(75) not null,
    nacionalidade varchar(75)
);

create table album(
	idAlbum int primary key auto_increment,
    titulo varchar(100) not null,
	tipo varchar(25) not null,
    anoLanc year not null,
    idArtista int not null,
    foreign key(idArtista) references artista(idArtista)
);

create table faixa(
    idFaixa int primary key auto_increment,
    titulo varchar(65) not null,
    genero varchar(50) not null,
    explicita char(1) not null,
    positividade tinyint not null,
	idAlbum int not null,
    foreign key(idAlbum) references album(idAlbum)
);

create table faixaArtista(
    idFaixa int,
    idArtista int,
    principalOuConvidado char(1) not null,
    primary key(idFaixa, idArtista),
	foreign key(idFaixa) references faixa(idFaixa),
	foreign key(idArtista) references artista(idArtista)
);

create table pya(
	idPya int primary key auto_increment,
    nome varchar(50) not null unique,
    positividade char(1) not null
);

create table pyaFaixa(
    idFaixa int,
    idPya int,
    principalOuConvidado char(1) not null,
    primary key(idFaixa, idPya),
	foreign key(idFaixa) references faixa(idFaixa),
	foreign key(idPya) references pya(idPya)
);

create table usuario(
	idUsuario int primary key auto_increment,
    nickname varchar(15) not null unique,
    dataNasc date not null,
    pronomes char(3) not null,
    avatar smallint default(1)
);

create table login(
	idLogin int primary key auto_increment,
    email varchar(60) not null unique,
	senha varchar(15) not null,
    idUsuario int not null,
    foreign key(idUsuario) references usuario(idUsuario)
);

create table avaliacao(
	idUsuario int,
    idFaixa int,
    salvoOuDispensado char(1) not null,
    primary key(idUsuario, idFaixa),
    foreign key(idUsuario) references usuario(idUsuario),
    foreign key(idFaixa) references faixa(idFaixa)
);

create table reproducao(
	idUsuario int,
    idFaixa int,
    dataHora datetime not null,
    primary key(idUsuario, idFaixa, dataHora),
    foreign key(idUsuario) references usuario(idUsuario),
    foreign key(idFaixa) references faixa(idFaixa)
);