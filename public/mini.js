var express = require('express'); //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server); // web socket server

// led part :
// var Gpio = require('pigpio').Gpio,
//   led = new Gpio(17, {mode: Gpio.OUTPUT});
//   led2= new Gpio(27, {mode: Gpio.OUTPUT}),
//   led3= new Gpio(22, {mode: Gpio.OUTPUT}),

server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages

var brightness = 0;//static variable to hold the current brightness

io.sockets.on('connection', function (socket) {//gets called whenever a client connects
        socket.on('message', function (data) {//makes the socket react to 'led' packets by calling this function
                console.log(data);
              });
      });
      // test retour joystick

      console.log("running test");
