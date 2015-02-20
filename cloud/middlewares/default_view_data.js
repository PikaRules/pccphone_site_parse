

module.exports = function (req, res, next) {
  
    var currentUser = Parse.User.current();
    var logged_in = false;
    var first_name = '';
    var last_name = '';
    
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
};