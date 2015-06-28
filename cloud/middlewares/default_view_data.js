

module.exports = function (req, res, next) {

    //if( typeof req.session != "undefined" ) {
    //    Parse.User.become(req.session.token ? req.session.token: "gibberish").then(function(user) { 
    if( typeof Parse.Session != "undefined" ) {
        Parse.User.become(Parse.Session.sessionToken  ? Parse.Session.sessionToken: "gibberish").then(function(user) { 
        // If null is passed to .become() it will assume current(), which we don't want
        //    [ user is now the client authenticated user ]
            checkLogin(req, res, next, user);
        });
    }
    else {
        checkLogin(req, res, next, null);
    }
  
};


var checkLogin = function(req, res, next, user){
    var currentUser;
    var logged_in = false;
    var first_name = '';
    var last_name = '';

    if (user == null){
        currentUser = Parse.User.current();
    } else {
        currentUser = user;
    }
    
    if (currentUser) {
        first_name = currentUser.get('firstname');
        last_name = currentUser.get('lastname');
        logged_in = true;
    }

    res.locals = {
        logged_in: logged_in,
        first_name: first_name,
        last_name: last_name
    };

    next();
}