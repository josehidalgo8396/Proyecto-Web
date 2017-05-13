var repository = require('../dataAccess/repository.js');

exports.allCupons = function(callback){
    repository.executeQuery({
        spName: 'sp_getCupons',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            data = data[0];
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Cupones"
                });
            }
            else{

                var paramsString = "'" + data[0][0].id + "'";

                repository.executeQuery({
                    spName:  'sp_get_Additional_Info_Cupon',
                    params: paramsString
                },
                function(success2, data2) {
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
                });

            }
        } 
        else 
        {callback(
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

        console.log(data);
        
        if(success) {
            data = data[0];

            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de Promociones"
                });
            }
            else{

                var paramsString = "'" + data[0][0].id + "'";

                repository.executeQuery({
                    spName:  'sp_get_Important_Info_Promotion',
                    params: paramsString
                },
                function(success2, data2) {
                    if(success){
                        data.ImportantInfo  = data2;

                        var paramsString2 = "'" + data[0][0].id + "'";

                        repository.executeQuery({
                            spName:  'sp_get_Must_Know_Info_Promotion',
                            params: paramsString2
                        },
                        function(success3, data3) {
                            if(success){
                                data.MustKnowInfo  = data3;

                                console.log(data);

                                callback({
                                    success: true, 
                                    message: "Operación exitosa",
                                    data: data
                                });
                            }  
                        });
                    }  
                });
            }
        } 
        else 
        {callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};