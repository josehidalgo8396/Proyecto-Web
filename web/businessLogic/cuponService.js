var repository = require('../dataAccess/repository.js');

exports.createCupon = function(data, callback){
    var paramsString =  "'"+data.info.title+"',"+
                        "'"+data.info.subtitle+"',"+
                        "'"+data.info.image+"',"+
                        "'"+data.info.maxPrice+"',"+
                        "'"+data.info.normalPrice+"',"+
                            data.info.save+ ','+
                            data.info.sold+ ','+
                            data.info.days+',1';
    repository.executeQuery({
        spName:  'sp_addCupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_addcupon == 0) {
                callback({
                    success: false, 
                    message: 'Ya existe un Cupon con ese nombre',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion del cupón de manera exitosa',
                    data: data[0].sp_addcupon
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado el cupon',
                data: {}
            });
        }
    });    
};


exports.createAdditionalInfoCupon = function(data, callback){
    var paramsString = data.id + ","+ "'"+data.params.info+"'";
    
    repository.executeQuery({
        spName:  'sp_add_Additional_Info_Cupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_add_additional_info_cupon == 0) {
                callback({
                    success: false, 
                    message: 'El cupon ya posee esa información adicional',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion del cupón de manera exitosa',
                    data: data[0].sp_add_additional_info_cupon
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado la información adicional',
                data: {}
            });
        }
    });    
};

exports.createRestrictionInfoCupon = function(data, callback){
    var paramsString = data.id + ","+ "'"+data.params.info+"'";

    repository.executeQuery({
        spName:  'sp_add_Restriction_Info_Cupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_add_restriction_info_cupon == 0) {
                callback({
                    success: false, 
                    message: 'El cupon ya posee esa información de restricción',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion del cupón de manera exitosa',
                    data: data[0].sp_add_restriction_info_cupon
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado la información de restricción',
                data: {}
            });
        }
    });    
};


exports.disableCupon = function(data, callback){

    repository.executeQuery({
        spName:  'sp_disableCupon',
        params: data.id
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_disablecupon == 0) {
                callback({
                    success: false, 
                    message: 'Ese cupón no existe en el sistema',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha deshabilitado el cupón de manera exitosa',
                    data: data[0].sp_disablecupon
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha deshabilitado el cupon',
                data: {}
            });
        }
    });    
};


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

exports.updateCupon = function(data, callback){
    var paramsString =      data.info.id+","+
                        "'"+data.info.title+"',"+
                        "'"+data.info.subtitle+"',"+
                        "'"+data.info.image+"',"+
                        "'"+data.info.maxprice+"',"+
                        "'"+data.info.normalprice+"',"+
                            data.info.save+ ','+
                            data.info.sold+ ','+
                            data.info.days;
    repository.executeQuery({
        spName:  'sp_updateCupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {                
            callback({
                success: true, 
                message: 'Se ha actualizado la informacion del cupón de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha actualizado el cupon',
                data: {}
            });
        }
    });    
};

exports.updateRestrictionInfoCupon = function(data, callback){
    var paramsString = data.id + ","+ "'"+data.info+"'";
    repository.executeQuery({
        spName:  'sp_update_Restriction_Info_Cupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: 'Se ha actualizado la informacion del cupón de manera exitosa',
                data: {}
            });
        }
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha actualizado la información adicional',
                data: {}
            });
        }
    });    
};

exports.updateAdditionalInfoCupon = function(data, callback){
    var paramsString = data.id + ","+ "'"+data.info+"'";
    repository.executeQuery({
        spName:  'sp_update_Additional_Info_Cupon',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: 'Se ha actualizado la informacion del cupón de manera exitosa',
                data: {}
            });
        }
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha actualizado la información adicional',
                data: {}
            });
        }
    });    
};