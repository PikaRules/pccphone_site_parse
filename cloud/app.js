var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var defaultViewData = require('cloud/middlewares/default_view_data.js');

var app = express();
var router = require('cloud/router.js');

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');

app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('asdfsd-fsdf-jsdfkj2ñ34-234-fjsfk2'));
app.use(parseExpressCookieSession({  
    fetchUser: true,
    key: 'pccfx.ph',
    cookie: { maxAge: 3600000 } 
}));
app.use(defaultViewData);


app.use(router);

app.listen();