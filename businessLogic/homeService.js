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


exports.getCupon = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Cupon',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data[0]
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información del cupón"
            });
        }
    });
};

exports.getAdditionalInfo = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Additional_Info_Cupon',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información adicional del cupón"
            });
        }
    });
};

exports.getRestrictionInfo = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Restriction_Info_Cupon',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información de restricción del cupón"
            });
        }
    });
};


exports.getPromotion = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data[0]
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información de la promoción"
            });
        }
    });
};

exports.getImportantInfo = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Important_Info_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información importante de la promoción"
            });
        }
    });
};

exports.getMustKnowInfo = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Must_Know_Info_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información que necesita saber de la promoción"
            });
        }
    });
};

exports.setCommentCupon = function(data, callback){
    var paramsString = data.idCupon + ",'" + data.comment + "','" + data.usuario + "'";
    repository.executeQuery({
        spName: 'sp_add_Cupon_Comment',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "El comentario se agregó correctamente",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar el comentario al cupón"
            });
        }
    });
};

exports.setCommentPromotion = function(data, callback){
    var paramsString = data.idPromotion + ",'" + data.comment + "','" + data.usuario + "'";
    repository.executeQuery({
        spName: 'sp_add_Promotion_Comment',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "El comentario se agregó correctamente",
                data: data
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo agregar el comentario a la promoción"
            });
        }
    });
};