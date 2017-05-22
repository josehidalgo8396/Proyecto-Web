var repository = require('../dataAccess/repository.js');
var sendmail = require('sendmail')();

exports.allCupons = function(callback){
    repository.executeQuery({
        spName: 'sp_getCupons',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Cupones"
                });
            }
            else{
                callback({
                    success: true, 
                    message: "Operación exitosa",
                    data: data
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.allPromotions= function(callback){
    repository.executeQuery({
        spName: 'sp_getPromotions',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Promociones"
                });
            }
            else{
                callback(
                {
                    success: true,
                    data: data,
                    message: "Operación exitosa"
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.getCuponTop5 = function(callback){
    repository.executeQuery({
        spName: 'sp_get_Top5_Cupon',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Cupones"
                });
            }
            else{
                callback({
                    success: true, 
                    message: "Operación exitosa",
                    data: data
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.getPromotionTop5= function(callback){
    repository.executeQuery({
        spName: 'sp_get_Top5_Promotion',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Promociones"
                });
            }
            else{
                callback(
                {
                    success: true,
                    data: data,
                    message: "Operación exitosa"
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};

exports.sendCuponInfo = function(data, callback) {
    var message =   "Título: " + data.title + "\n"+
                    "Precio normal: ₡" + data.normalprice + "\n"+
                    "Precio ahora: ₡" + data.maxprice + "\n"+
                    "Ahorra: " + data.save + "%";
    sendmail({
        from: "lujaramireztorres@gmail.com",
        to: data.correo,
        subject: "Información del cupón",
        html: message,
    }, function(err, reply) {
        if(err) {
            callback({
                success: false,
                message: "Error al enviar el correo"
            })
        }
        else{
            callback({
                success: true,
                message: "El correo se ha enviado exitosamente"
            })
        }
    });
};

exports.sendPromotionInfo = function(data, callback) {
    var message =   "Título: " + data.title + "\n"+
                    "Precio normal: ₡" + data.value + "\n"+
                    "Precio ahora: ₡" + data.price + "\n"+
                    "Ahorra: " + data.save + "%";
    sendmail({
        from: "lujaramireztorres@gmail.com",
        to: data.correo,
        subject: "Información del cupón",
        html: message,
    }, function(err, reply) {
        if(err) {
            callback({
                success: false,
                message: "Error al enviar el correo"
            })
        }
        else{
            callback({
                success: true,
                message: "El correo se ha enviado exitosamente"
            })
        }
    });
};