/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/
var connection = require('./connection.js');

exports.executeQuery = function(data, callback) {

    var client = connection.createConnection();
    client.connect(function(err) {
        if(err) {
            console.log(err);
            callback(false, null);
        }
        else{
            var sql = 'SELECT '+data.spName+'('+data.params+');';
            client.query(sql, function(err2, result) {
                if(err2) {
                    console.log(err2);
                    client.end();
                    callback(false, null);
                }
                else {
                    client.end();
                    callback(true, result.rows[0]); 
                }        
            }); 
        }
    });
};


    