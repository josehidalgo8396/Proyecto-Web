var repository = require('../dataAccess/repository.js');




exports.createCupon = function(data, callback){
    var paramsString =  "'"+data.title+"',"+
                        "'"+data.subtitle+"',"+
                        "'"+data.image+"',"+
                            data.maxPrice+','+
                            data.normalPrice+','+
                            data.save+ ','+
                            data.sold+ ','+
                            data.days;

    repository.executeQuery({
        spName:  'sp_addCupon',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0] == 0) {
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
                    data: dataQuery[0]
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado el funcionario',
                data: {}
            });
        }
    });    
};


exports.createAdditionalInfoCupon = function(data, callback){
    var paramsString =      data.idCupon + ","+ "'"+data.info+"'";

    repository.executeQuery({
        spName:  'sp_add_Additional_Info_Cupon',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0] == 0) {
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
                    data: dataQuery[0]
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
    var paramsString =      data.idCupon + ","+ "'"+data.info+"'";

    repository.executeQuery({
        spName:  'sp_add_Restriction_Info_Cupon',
        params: paramsString
    },
    function(success, dataQuery) {
        if(success) {
            if(dataQuery[0] == 0) {
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
                    data: dataQuery[0]
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


/*
repository.executeQuery({
                    spName:  'sp_get_Additional_Info_Cupon',
                    params: data[0].id
                },
                function(success2, data2) {
                    console.log(data2);
                    if(success){
                        data.additionalInfo  = data2;

                        var paramsString2 = "'" + data[0][0].id + "'";

                        repository.executeQuery({
                            spName:  'sp_get_Restriction_Info_Cupon',
                            params: paramsString2
                        },
                        function(success3, data3) {
                            if(success){
                                data.restrictionInfo  = data3;

                                callback({
                                    success: true, 
                                    message: "Operación exitosa",
                                    data: data
                                });
                            }  
                        });
                    }  
                });*/
