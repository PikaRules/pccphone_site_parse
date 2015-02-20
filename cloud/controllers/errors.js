

module.exports = function(){
    var express = require('express');
    var app = express();
    

    app.get('/error/404', function(req, res) {
        res.render('errors/http', { code: '404', message: "The page coudn not be found" });
    });


    app.get('/error/403', function(req, res) {
        res.render('errors/http', { code: '403', message: "You do not have access to this resource" });
    });


    app.get("/*", function(req, res) {
        res.redirect('/error/404');
    });


    return app;
}();