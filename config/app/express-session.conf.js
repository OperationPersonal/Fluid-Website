var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var config = {
  'cookie': {
    'domain': undefined, //- this is usually unset - Domain Set-Cookie attribute - assumed current domain
    'httpOnly': false, // HTTPOnly Set-Cookie attribute - whether you can see document.cookie or not(js)
    'maxAge': 10 * 60 * 60 * 24,
    'path': '/', // Path Set-Cookie value - this is root domain
    'secure': false //https only
  },
  'name': process.env.SESSION_NAME || 'Session', // Name used to filter out the session between different servers
  'proxy': undefined, // uses express' settings
  'resave': false, // Mongo Store implements "touch" sessions - meaning it always resaves anyways
  'rolling': false, // whether every RESPONSE resets maxAge usually only requests do this
  'saveUninitialized': false, // Passport no longer need this - it also saves space for this to be false
  'secret': process.env.SESSION_SECRET || 'strange secret huh',
  'store': new MongoStore({ // Persistent logins :/
    'mongooseConnection': mongoose.connection
  }),
  'unset': 'keep' // This makes sure session doesnt get destroyed after each request
};

module.exports = config;
