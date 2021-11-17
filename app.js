// Import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Connect to mongoDB Database
var mongoDB = 'mongodb+srv://dbUser:dbUserPassword@cluster0.q8mld.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Import routes for different area of sites
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
const cliBoxes = require('cli-boxes');

// Initialise Express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add random stuff to middleware chain
app.use(logger('dev')); // Log stuff to console
app.use(express.json()); // Send stuff in json?
app.use(express.urlencoded({ extended: false })); // Don't encode url?
app.use(cookieParser()); // For cookie stuff, I guess
app.use(express.static(path.join(__dirname, 'public'))); // For displaying static files from public dir

// Add routes to middleware chain
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


