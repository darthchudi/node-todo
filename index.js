const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const mongoose = require('mongoose');

//Set the View Engine
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');

//Serve static files
app.use(express.static(__dirname+'/public'));

//Call in body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Set up MongoDB connection
mongoose.connect('mongodb://192.168.33.68:27017/todo');
mongoose.connection.on('error', function(err){
	console.log('Error: '+err.message);
});
mongoose.connection.once('open', function(){
	console.log('MongoDB ting!');
});

//Import models
require('./models/Task');

//Load Routes
app.use('/', routes);

app.set('port', 3000);
const server = app.listen(app.get('port'), ()=>{
	console.log(`Express is running on ${server.address().port}`);
});