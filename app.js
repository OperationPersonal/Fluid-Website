var express = require( 'express' );
var path = require( 'path' );
var logger = require( 'morgan' );
var bodyParser = require( 'body-parser' );
var session = require( 'express-session' );
var swig = require( 'swig' );
var favicon = require( 'serve-favicon' );

var router = require( './routes' );
var config = require( './config/app' );

var app = express();

app.use( logger( config.logger.format, config.logger.options ) );

app.use( bodyParser.json( config.bodyParser.json ) );
app.use( bodyParser.urlencoded( config.bodyParser.urlencoded ) );

app.use( session( config.session ) );

app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );

app.use( '/public', express.static( 'public' ) );
app.use( '/dist', express.static( 'dist' ) );

app.use( '/', router );
module.exports = app;
