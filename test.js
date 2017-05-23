var express = require('express'); //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server); // web socket server

// led part :
var Gpio = require('pigpio').Gpio,
  led = new Gpio(17, {mode: Gpio.OUTPUT});
  led2= new Gpio(27, {mode: Gpio.OUTPUT}),
  led3= new Gpio(22, {mode: Gpio.OUTPUT}),
tempo=200

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/ttyACM0", { baudrate: 115200 }); // !!!!!!!!!!!/!!\ in case of Arduino

server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages

var brightness = 0;//static variable to hold the current brightness

io.sockets.on('connection', function (socket) {//gets called whenever a client connects
        socket.on('led', function (data) {//makes the socket react to 'led' packets by calling this function
                brightness = data.value;//updates brightness from the data object

                //var buf = new Buffer(1);//creates a new 1-byte buffer
                //buf.writeUInt8(brightness, 0);//writes the pwm value to the buffer
              //  serialPort.write(buf);//transmits the buffer to the arduino !!!!!!!!!!!!!!!!
          //    console.log(buf);
              console.log(brightness);
              function waitSeconds(iMilliSeconds) {
                  var counter= 0
                      , start = new Date().getTime()
                      , end = 0;
                  while (counter < iMilliSeconds) {
                      end = new Date().getTime();
                      counter = end - start;
                  }
              }
              led.servoWrite(1700);// remplacement pwm par servo
              led2.servoWrite(1350);// remplacement pwm par servo
              led3.servoWrite(1600);// remplacement pwm par servo// remplacement pwm par servo
                io.sockets.emit('led', {value: brightness});
        });

        socket.emit('led', {value: brightness});//send the new client the current brightness
});
// test retour joystick



console.log("running test");
