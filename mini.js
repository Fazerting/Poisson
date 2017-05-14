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
var mode = true;

io.sockets.on('connection', function (socket) {//gets called whenever a client connects
        socket.on('mode', function (data) {//makes the socket react to 'led' packets by calling this function
            if (data==1){
              mode=!mode;
              console.log("Mode :",mode);
              socket.emit('modeactuel',mode);
            }
         });
       socket.on('deplacer', function (deplace) {
         if (deplace==0){
           console.log("deplacement :",deplace);
         }
         if (deplace==1){
           console.log("deplacement :",deplace);
         }
         if (deplace==2){
           console.log("deplacement :",deplace);
         }
         if (deplace==3){
           console.log("deplacement :",deplace);
         }
       });
      // test retour joystick
    });
      console.log("running test");
