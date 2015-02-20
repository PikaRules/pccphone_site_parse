

module.exports = function(){
    var express = require('express');
    var app = express();

    var errors = require('cloud/controllers/errors.js');
    var login = require('cloud/controllers/login.js');
    var user = require('cloud/controllers/users_controller.js');

    app.get('/', function(req, res) {
        res.redirect('/home');
    });

    app.get('/home', function(req, res) {
        res.render('home');
    });

    app.use(login);
    app.use(user);
    app.use(errors);

    return app;
}();
