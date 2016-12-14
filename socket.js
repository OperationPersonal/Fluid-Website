module.exports = function(io){

  io.sockets.on('connection', function(socket){
    console.log(socket + ' connected!');
  });

  return function(socket){
    socket.on('hit', function(data){
      console.log('payload', data);
      io.sockets.emit('returnfire', {
        message:'hi'
      });
    });


  };
};
