var repository = require('../dataAccess/repository.js');

exports.createPromotion = function(data, callback){
    var paramsString =  "'"+data.info.title+"',"+
                        "'"+data.info.image1+"',"+
                        "'"+data.info.image2+"',"+
                            data.info.price+','+
                            data.info.value+','+
                            data.info.discount+ ','+
                            data.info.save+ ','+
                            data.info.sold+',1';

    repository.executeQuery({
        spName:  'sp_addPromotion',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_addpromotion == 0) {
                callback({
                    success: false, 
                    message: 'Ya existe una promoción con ese nombre',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion de la promoción de manera exitosa',
                    data: data[0].sp_addpromotion
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado la promoción',
                data: {}
            });
        }
    });    
};


exports.createImportantInfoPromotion= function(data, callback){
    var paramsString = data.id + ","+ "'"+data.params.info+"'";
    repository.executeQuery({
        spName:  'sp_add_Important_Info_Promotion',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_add_important_info_promotion == 0) {
                callback({
                    success: false, 
                    message: 'La promoción ya posee esa información importante',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion de la promoción de manera exitosa',
                    data: data[0].sp_add_important_info_promotion
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado la información importante',
                data: {}
            });
        }
    });    
};

exports.createMustKnowInfoPromotion = function(data, callback){
    var paramsString = data.id + ","+ "'"+data.params.info+"'";

    repository.executeQuery({
        spName:  'sp_add_Must_Know_Info_Promotion',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_add_must_know_info_promotion == 0) {
                callback({
                    success: false, 
                    message: 'La promoción ya posee esa información',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion de la promoción de manera exitosa',
                    data: data[0].sp_add_restriction_info_cupon
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado la información',
                data: {}
            });
        }
    });    
};


exports.disablePromotion = function(data, callback){

    repository.executeQuery({
        spName:  'sp_disablePromotion',
        params: data.id
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_disablepromotion == 0) {
                callback({
                    success: false, 
                    message: 'Esa promoción no existe en el sistema',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha deshabilitado la promoción de manera exitosa',
                    data: data[0].sp_disablepromotion
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha deshabilitado la promoción',
                data: {}
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

exports.getPromotion = function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de la promoción"
                });
            }
            else{
                callback(
                {
                    success: true,
                    data: data[0],
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

exports.getImportantInfo= function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Important_Info_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de la información importante"
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

exports.getMustKnowInfo= function(data, callback){
    repository.executeQuery({
        spName: 'sp_get_Must_Know_Info_Promotion',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de la informacón que necesita saber"
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

exports.updatePromotion= function(data, callback){
    var paramsString =      data.info.id+","+
                        "'"+data.info.title+"',"+
                        "'"+data.info.image1+"',"+
                        "'"+data.info.image2+"',"+
                            data.info.price+','+
                            data.info.value+','+
                            data.info.discount+ ','+
                            data.info.save+ ','+
                            data.info.sold;

    repository.executeQuery({
        spName: 'sp_updatePromotion',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                data: {},
                message: "La información se actualizó correctamente"
            });
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

exports.updateImportantInfo= function(data, callback){
    var paramsString = data.id + ","+ "'"+data.info+"'";

    repository.executeQuery({
        spName: 'sp_update_Important_Info_Promotion',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                data: {},
                message: "La información se actualizó correctamente"
            });
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

exports.updateImportantInfo= function(data, callback){
    var paramsString = data.id + ","+ "'"+data.info+"'";

    repository.executeQuery({
        spName: 'sp_update_Must_Know_Info_Promotion',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                data: {},
                message: "La información se actualizó correctamente"
            });
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

