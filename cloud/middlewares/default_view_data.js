

module.exports = function (req, res, next) {




    var GameScore = Parse.Object.extend("User");

    var query = new Parse.Query(GameScore);
    query.get("wBX3mpQbfr", {
      success: function(gameScore) {
        //checkLogin(req, res, next, gameScore);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });

    checkLogin(req, res, next, null);
 
  
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