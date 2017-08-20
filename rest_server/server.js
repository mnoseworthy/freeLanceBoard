var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  Contract = require('./api/models/contractModel'), 
  bodyParser = require('body-parser'),
  cors = require('cors');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test'); 

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json( { type: '*/*' } ));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//register user routes
var userRoutes = require('./api/routes/userRoutes'); //importing routes
userRoutes(app); 
//register contract routes
var contractRoutes = require('./api/routes/contractRoutes'); //importing routes
contractRoutes(app); 



//Handle invalid responses
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found...'})
});


app.listen(port);


console.log('Server start on port: ' + port);

