/**
 * Created by teppei.fujisawa on 2017/02/14.
 */

var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
    console.log('on connected:');
    client.on('event', function(data){
        console.log('on event:', data);
    });
    client.on('disconnect', function(){
        console.log('on disconnected:');
    });
});
console.log('listen on 3012');
server.listen(3012);