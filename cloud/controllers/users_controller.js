
module.exports = function(){
    var express = require('express');
    var app = express();

    // show logged user twilio user account
    app.get('/account', function(req, res) {

        var currentUser = Parse.User.current();
        var account_sid = '';
        var auth_token = '';
        var flash = '';

        try {
            if (currentUser) {
                account_sid = currentUser.get('account_sid');
                auth_token = currentUser.get('auth_token');
            }
        } catch(err) {
            //pass
        }

        res.render('users_data/account', {
            account_sid: account_sid,
            auth_token: auth_token,
            flash: flash
        });
    });


    // save twilio user account
    app.post('/account', function(req, res) {
        var currentUser = Parse.User.current();
        var account_sid = req.body.account_sid;
        var auth_token = req.body.auth_token;
        var flash = ''; 

        var end = function(account_sid, auth_token, flash) {
            res.render('users_data/account', {
                account_sid: account_sid,
                auth_token: auth_token,
                flash: flash
            });
        }

        if (currentUser) {
            currentUser.set('account_sid', account_sid);
            currentUser.set('auth_token', auth_token);
            currentUser.save(null, {
                flash: flash,
                success: function(resp) {
                    flash = 'The account was successfully saved';
                    end(account_sid, auth_token, flash);
                },
                error: function(resp, error) {
                    flash =  error.message;
                    end(account_sid, auth_token, flash);
                }
            });
        } else {
            res.redirect('/error/403');
        }
    });


    return app;
}();