module.exports = {
  /*DATA FOR POST AND PUT AND PATCH REQUESTS*/
  'json': {
    'inflate': true, // Make it JSON
    'limit': '200kb', // Parser body data size limit
    'strict': false, // Doesn't have to be a JSON object, can be string or mixed
    'type': 'application/json' // Header Content-type=application/json
  },
  /*DATA FOR ALL REQUESTS*/
  'urlencoded': {
    'extended': true, //No dictionaries in the url please
    'inflate': true, //MAKE IT A JSON
    'limit': '100kb' //SMALL LIMIT
  }
};
