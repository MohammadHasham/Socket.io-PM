module.exports = (io)=> {
  let users = []; //currnt sockets that are connected
  io.on('connection',function(socket){
    socket.on('socketData',function(data){
      users.push(data)
      io.emit('updates',users);
    });
    socket.on('sendMessage',async function(data){
      let user = await checkRecord(data);
      io.to(data.id).emit('reply',{username:user[0].username,msg:data.msg})
    });
  });

  function checkRecord(data){
    return users.filter((item)=> item.id == data.identity);
  }
};
