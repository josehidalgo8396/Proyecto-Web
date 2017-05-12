var contactService   = require('../businessLogic/contactService.js');

exports.sendMail = function(dRequest, dResponse) {
    var data = contactService.sendMail(dRequest.body, function(data){
        dResponse.send(data);
    });
};