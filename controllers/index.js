var exports = module.exports;

exports.get = function( req, res ) {
  res.render( 'index' );
};

exports.catch = require( './catch' );
