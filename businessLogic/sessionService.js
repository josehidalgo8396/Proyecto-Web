/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramirez Torres
 *Sistema de apoyo administrativo
*/
var repository = require('../dataAccess/repository.js');
exports.validateUser = function(data, callback){
    var paramsString = "'" +data.userName+"'"+','+"'"+data.password+"'";
    var spName = 'sp_login';
    if(data.type) {
        spName = 'sp_register';
        paramsString = "'" +data.userName+"'"+","+"'" + data.name +"'" +"," +"'" + data.password +"'"+","+data.rol+",1";
    }
    repository.executeQuery({
        spName: spName,
        params: paramsString
    }, 
    function(success, data2) {
        if(success) {
            if(data2[0].sp_login != undefined) {
                if(data2[0].sp_login == -1) {
                    callback({
                        status: false, 
                        message: 'Usuario o contraseña no válida',
                        data: {}
                    });
                }
                else {
                    callback({
                        status: true, 
                        message: 'Usuario válido',
                        data: data2[0].sp_login
                    });
                }
            }
            else{
                callback({
                    status: true, 
                    message: 'Registro con Facebook exitoso',
                    data: {}
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha validado la sesión',
                data: {}
            });
        }
    });    
};