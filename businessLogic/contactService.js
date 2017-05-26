var sendmail = require('sendmail')();

exports.sendMail = function(data, callback) {
    sendmail({
        from: data.email,
        to: 'lujaramireztorres@gmail.com',
        subject: data.name + " " + data.lastName,
        html: data.message,
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