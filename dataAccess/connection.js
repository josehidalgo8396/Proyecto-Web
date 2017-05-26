/*
 *Tecnologico de Costa Rica
 *Proyecto de ingenieria de software
 *Luis Javier Ramírez Torres
 *Sistema de apoyo administrativo
*/

var pg = require('pg'); 

exports.createConnection = function() {
    var client = new pg.Client({
        user: "mrlkocoknmudag",
        password: "fae9159ceda9d067cabfb2a830728386bc4bc4d5bbc64314762315afc6170696",
        database: "dfq0rj1rheq4qq",
        port: 5432,
        host: "ec2-54-204-32-145.compute-1.amazonaws.com",
        ssl: true
    });
    return client;
};





