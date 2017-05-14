var express = require('express'); //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server); // web socket server

// led part :
var Gpio = require('pigpio').Gpio,
  led = new Gpio(17, {mode: Gpio.OUTPUT});
  led2= new Gpio(27, {mode: Gpio.OUTPUT}),
  led3= new Gpio(22, {mode: Gpio.OUTPUT}),
tempo=1000

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/ttyACM0", { baudrate: 115200 }); // !!!!!!!!!!!/!!\ in case of Arduino

server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages

var brightness = 0;//static variable to hold the current brightness

io.sockets.on('connection', function (socket) {//gets called whenever a client connects
        socket.on('led', function (data) {//makes the socket react to 'led' packets by calling this function
                brightness = data.value;//updates brightness from the data object
                console.log(brightness);
                

              function mapause(time)
              {
                d=new Date();
                diff=0;
                while(diff < time)
                {
                  n=new Date();
                  diff=n-d;
                }
              }
              tempo=100;
              reg1=-230
              reg2=-50
              reg3=0
              // setInterval(function () {
              if (brightness<1000){
                led.servoWrite(reg1+1700);// remplacement pwm par servo
                led2.servoWrite(reg2+1800);// remplacement pwm par servo
                led3.servoWrite(reg3+1900);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1600);// remplacement pwm par servo
                led2.servoWrite(reg2+1700);// remplacement pwm par servo
                led3.servoWrite(reg3+1800);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1700);// remplacement pwm par servo
                led2.servoWrite(reg2+1600);// remplacement pwm par servo
                led3.servoWrite(reg3+1700);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1800);// remplacement pwm par servo
                led2.servoWrite(reg2+1700);// remplacement pwm par servo
                led3.servoWrite(reg3+1600);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1900);// remplacement pwm par servo
                led2.servoWrite(reg2+1800);// remplacement pwm par servo
                led3.servoWrite(reg3+1700);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+2000);// remplacement pwm par servo
                led2.servoWrite(reg2+1900);// remplacement pwm par servo
                led3.servoWrite(reg3+1800);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1900);// remplacement pwm par servo
                led2.servoWrite(reg2+2000);// remplacement pwm par servo
                led3.servoWrite(reg3+1900);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1800);// remplacement pwm par servo
                led2.servoWrite(reg2+1900);// remplacement pwm par servo
                led3.servoWrite(reg3+2000);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
              }
              if (brightness>2000){
                led.servoWrite(reg1+1100);// remplacement pwm par servo
                led2.servoWrite(reg2+1200);// remplacement pwm par servo
                led3.servoWrite(reg3+1300);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1000);// remplacement pwm par servo
                led2.servoWrite(reg2+1100);// remplacement pwm par servo
                led3.servoWrite(reg3+1200);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1100);// remplacement pwm par servo
                led2.servoWrite(reg2+1000);// remplacement pwm par servo
                led3.servoWrite(reg3+1100);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1200);// remplacement pwm par servo
                led2.servoWrite(reg2+1100);// remplacement pwm par servo
                led3.servoWrite(reg3+1000);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1300);// remplacement pwm par servo
                led2.servoWrite(reg2+1200);// remplacement pwm par servo
                led3.servoWrite(reg3+1100);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1400);// remplacement pwm par servo
                led2.servoWrite(reg2+1300);// remplacement pwm par servo
                led3.servoWrite(reg3+1200);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1300);// remplacement pwm par servo
                led2.servoWrite(reg2+1400);// remplacement pwm par servo
                led3.servoWrite(reg3+1300);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1200);// remplacement pwm par servo
                led2.servoWrite(reg2+1300);// remplacement pwm par servo
                led3.servoWrite(reg3+1400);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
              }
              if (brightness<=2000 && brightness>=1000){
                led.servoWrite(reg1+1400);// remplacement pwm par servo
                led2.servoWrite(reg2+1500);// remplacement pwm par servo
                led3.servoWrite(reg3+1600);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1300);// remplacement pwm par servo
                led2.servoWrite(reg2+1400);// remplacement pwm par servo
                led3.servoWrite(reg3+1500);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1400);// remplacement pwm par servo
                led2.servoWrite(reg2+1300);// remplacement pwm par servo
                led3.servoWrite(reg3+1400);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1500);// remplacement pwm par servo
                led2.servoWrite(reg2+1400);// remplacement pwm par servo
                led3.servoWrite(reg3+1300);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1600);// remplacement pwm par servo
                led2.servoWrite(reg2+1500);// remplacement pwm par servo
                led3.servoWrite(reg3+1400);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1700);// remplacement pwm par servo
                led2.servoWrite(reg2+1600);// remplacement pwm par servo
                led3.servoWrite(reg3+1500);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1600);// remplacement pwm par servo
                led2.servoWrite(reg2+1700);// remplacement pwm par servo
                led3.servoWrite(reg3+1600);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
                led.servoWrite(reg1+1500);// remplacement pwm par servo
                led2.servoWrite(reg2+1600);// remplacement pwm par servo
                led3.servoWrite(reg3+1700);// remplacement pwm par servo// remplacement pwm par servo
                mapause(tempo);
            }
                io.sockets.emit('led', {value: brightness});
              // }, 2000);
        });

        socket.emit('led', {value: brightness});//send the new client the current brightness
});
// test retour joystick

console.log("running test");
