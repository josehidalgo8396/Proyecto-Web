var repository = require('../dataAccess/repository.js');


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


/* 
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
                });*/