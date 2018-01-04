const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

//Set the View Engine
app.engine('pug', require('pug').__express)
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');

//Serve static files
app.use(express.static(__dirname+'/public'));

//Call in body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Configure Passport
require('./config/passport.js')(passport);

//Populate req.cookies with any cookies we encounter
app.use(cookieParser());

//Set Session
app.use(session({
	secret: 'darth-chudi'
}));

//Set Passport for authentication
app.use(passport.initialize());
app.use(passport.session());


//Pull in flash middleware
app.use(flash());

//Set up MongoDB connection
mongoose.connect('mongodb://192.168.33.68:27017/todo');
mongoose.connection.on('error', function(err){
	console.log('Error: '+err.message);
});
mongoose.connection.once('open', function(){
	console.log('MongoDB ting!');
});

//Load Routes
// app.use('/', routes);
require('./routes/routes')(app, passport);

app.set('port', 3000);
const server = app.listen(app.get('port'), ()=>{
	console.log(`Express is running on ${server.address().port}`);
});