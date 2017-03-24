"use strict";

let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let bcrypt = require("bcrypt-nodejs");


let hash = bcrypt.hashSync("dsi1617password");
let users = {
   dsi1617 : hash
};

let instructions = `
Visit these urls in the browser:
<ul>
  <li> <a href="/login">Login</a> </li>
	<li> <a href="/content">Introduccion</a></li>
  <li> <a href="/logout">Logout</a> </li>
</ul>
`;

let layout = function(x) { return x+"<br />\n"+instructions; };

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  console.log(req.body);

  if (!req.body.username || !req.body.password) {
    console.log('login failed');
    res.send('login failed');
  }
  else if(req.body.username in users  &&
            bcrypt.compareSync(req.body.password, users[req.body.username])) {
    req.session.user = req.body.username;
    req.session.admin = true;
    res.send(layout("login success! user "+req.session.user));
  }
  else {
    console.log(`login ${util.inspect(req.body)} failed`);
    res.send(layout(`login ${util.inspect(req.body)} failed. You are ${req.session.user || 'not logged'}`));
  }
});

app.get('/', function(req, res) {
  res.send(instructions);
});
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(layout("logout success!"));
});

// Get content endpoint
app.get('/content/*?',
    auth  // next only if authenticated
);



app.set('port', (process.env.PORT || 8080));



app.use('/content', express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});