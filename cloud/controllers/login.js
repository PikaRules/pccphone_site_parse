
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

    app.post('/facebook_login', function(req, res) {
        //https://github.com/Thuzi/facebook-node-sdk/
        //https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.3
        //https://parse.com/tutorials/adding-third-party-authentication-to-your-web-app

        var sessionToken = req.body.sessionToken;
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var user_existed = req.body.user_existed;

        //login user in backend using fronted user facebook session
        Parse.User.become(sessionToken).then(function (user) {
            //update user data if it is first time facebook login
            if ( firstname ) {
                user.set("email", email);
                user.set("firstname", firstname);
                user.set("lastname", lastname);
                user.save(null,{
                    success: function(nuser) {
                        res.status(200).json({ sucess: true, error:"" });
                    },
                    error: function(error) {
                      res.status(200).json({ sucess: true, error:"user new data not saved" });
                    }
                });
            } else {
                res.status(200).json({ sucess: true, error:"" });
            }

        }, function (error) {
          res.status(500).json({ sucess: false, error:"" });
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