var express = require('express'); // Require Express..

var socketio = require('socket.io'); //Just Require the Socket Io to use it in this File..

//Now setup the App Variable..
var app = express();

//create a server and store it in a variable server..
var server = app.listen(process.env.PORT || '3000', function(){
    console.log('Server is running Successfully on the Port Specified..');
});


//For now the Server is running on 3000 without serving anything..

//Serving the Static Files inside a folder.. i.e. public folder in this case..
app.use(express.static('public'));

//Now setup the io variable..
var io = socketio(server); // Making Socket io to work on the server we created..

//Now io variable is having all the functionality of the socket..
io.on('connection', function(socketio){
    // io is listening to the event "connection".. Whenever the server is triggered
//The respective call back function is called.. 
//Passing the socketio variable just for uniqueness..
    console.log('Made the Socket Connection..' + socketio.id);

    //listening to the event chat which is created in front end..(this is a custom event..)
    socketio.on('chat', function(data){ //Here 'data' is the Object sent from the FrontEnd..
        console.log(data);

        io.sockets.emit('chat', data); //Sending the Data to all the Running the sockets..

    });

    //listening to event Typing on Frontend and Broadcasting the same to other users..
    socketio.on('typing', function(userName){
        console.log(userName);

        socketio.broadcast.emit('typing', userName);// Sending the Username to Frontend.. (to other Users)..
    });

});