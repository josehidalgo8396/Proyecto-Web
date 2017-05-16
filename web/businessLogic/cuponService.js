var repository = require('../dataAccess/repository.js');

exports.createCupon = function(data, callback){
    var paramsString =  "'"+data.info.title+"',"+
                        "'"+data.info.subtitle+"',"+
                        "'"+data.info.image+"',"+
                            data.info.maxPrice+','+
                            data.info.normalPrice+','+
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