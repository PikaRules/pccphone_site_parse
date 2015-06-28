
module.exports = function(){
    var express = require('express');
    var app = express();


    // Render the login page
    app.get('/signin', function(req, res) {
        res.render('login/signin', {flash:''});
    });


    // Logs in the user
    app.post('/signin', function(req, res) {
          Parse.User.logIn(req.body.email, req.body.password).then(function(user) {
          res.redirect('/');
        }, function(error) {
          // Show the error
          res.render('login/signin', { flash: error.message });
        });
    });

    app.get('/facebook_signin', function(req, res) {
        //https://github.com/Thuzi/facebook-node-sdk/
        //https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.3
        //https://parse.com/tutorials/adding-third-party-authentication-to-your-web-app
        Parse.FacebookUtils.init();
        Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          res.render('login/signin', { flash: "user logged" });
        } else {
          res.render('login/signin', { flash: "user not logged" });
        }
      },
      error: function(user, error) {
        res.render('login/signin', { flash: "error" });
      }
    });

        

    });


    // Renders the signup page
    app.get('/signup', function(req, res) {
        res.render('login/signup');
    });


    // Signs up a new user
    app.post('/signup', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        var user = new Parse.User();
        user.set('username', email);
        user.set('password', password);
        user.set('firstname', firstname);
        user.set('lastname', lastname);

        user.signUp().then(function(user) {
          res.redirect('/');
        }, function(error) {
          res.render('signup', { flash: error.message });
        });
    });


    // Logs out the user
    app.get('/logout', function(req, res) {
        Parse.User.logOut();
        res.redirect('/');
    });

  return app;
}();