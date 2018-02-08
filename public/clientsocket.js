//Make Connection Between Client and Server..
//FrontEnd coonection to Backend..

var webClient = io.connect('http://localhost:3000');

//Getting Variables from FrontEnd..
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit the messages..
btn.addEventListener('click', function(){
    webClient.emit('chat', { //Creating a Event Chat.. this is to handled from server end.. 
        //and the JSON Object is created for the same..
        message: message.value, 
        handle: handle.value
    });
});

//Broadcast a Message.. The message which emits data to all the running Sockets except the socket using it..
// for eg. Typing.... user typing the message will not see typing .. but other clients will see the Typing..

//adding event listen to message variable..
message.addEventListener('keypress', function(){
    webClient.emit('typing', handle.value); //Sending the name of the Person typing..
});

//Listen for Events.. Chats..
webClient.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + '</strong> <br>' + data.message + '</p>';
});


//Listen to Events.. Typing..
webClient.on('typing', function(userName){
    feedback.innerHTML += '<p><em>' + userName + ' is typing a Message..' + '</em></p>'; 
});
