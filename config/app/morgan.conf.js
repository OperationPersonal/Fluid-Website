module.exports = {
  'format': ':method :status ":url" :response-time[3] ms || | Size: :res[content-length] octets To WWW ',
  'options': {
    'immediate': false, // WILL WAIT FOR REQUEST TO FINISH
    'skip': false, // SET AS FUNCTION TO DETERMINE WHEN TO LOG-FALSE MEANS ALWAYS LOG
    'stream': process.stdout // WHERE TO LOG
  }
};
