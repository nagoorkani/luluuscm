var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// app configure
var app = express();

// server port
var port    = 	process.env.PORT || 6767;

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname + '/../')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Database
var mongoose =  require('mongoose'), autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect("mongodb://localhost:27017/scmdb");

autoIncrement.initialize(connection);

// routes
var routes      = require('./routes/index');
var customers   = require('./routes/customers');
var orders      = require('./routes/orders');
var products    = require('./routes/products');

// route config
app.use('/', routes);
app.use('/customers', customers);
app.use('/orders', orders);
app.use('/products', products);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

// Start server
// ==============================================
app.listen(port);
console.log('Luluu express server listening on port ' + port);