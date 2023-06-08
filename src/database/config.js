var mysql = require("mysql2");

var config = {
    host: "localhost",
    database: "pyaoriDb",
    user: "pyaoriPublic",
    password: "7Uq9GWSdMkZR$cNe"
}

function execute(command){
    return new Promise(function (resolve, reject){
        var connection = mysql.createConnection(config);
        connection.connect();
        connection.query(command, function(error, results){
            connection.end();
            if(error){
                reject(error)
            }
            console.log(results);
            resolve(results);
        })
        connection.on('error', function(error){
            return (`Erro no banco de dados: ${error.sqlMessage}`);
        });
    });
}

module.exports = {
    execute
}