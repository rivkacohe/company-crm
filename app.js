var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');

const auth = require('./middleware/auth');
const headers = require('./middleware/headers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(headers);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers',auth, customersRouter);

module.exports = app;
