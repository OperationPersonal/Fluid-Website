var exports = module.exports;
/** @module Catch */

/**
 * 404
 * @param  {Object}   req  express-req
 * @param  {Object}   res  express-res
 * @param  {Function} next
 */
exports.notFound = function(req, res, next) {
  let err = new Error('404 Path not found');
  err.status = 404;
  next(err);
};

/**
 * Responds to the request with a json containing the err
 * created by the request.
 * @param  {Object}   err  Error
 * @param  {Object}   req  express-req
 * @param  {Object}   res  express-res
 * @param  {Function} next
 */
exports.errResponse = function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    err: {
      status: err.status,
      message: err.message
    }
  });
};
