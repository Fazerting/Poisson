


var Gpio = require('pigpio').Gpio,
// led = new Gpio(PIN, {mode: Gpio.OUTPUT--INPUT}),
  motor = new Gpio(17, {mode: Gpio.OUTPUT}),
  motor2= new Gpio(27, {mode: Gpio.OUTPUT}),
  motor3= new Gpio(22, {mode: Gpio.OUTPUT}),
  dutyCycle = 0,
  tempo=0,
  pulseWidth = 1000,
  increment = 100;

setInterval(function () {
  motor.servoWrite(pulseWidth);
  motor2.servoWrite(-pulseWidth);
  motor3.servoWrite(pulseWidth);

  pulseWidth += increment;
  //test=-pulseWidth;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
}, 100);


// setInterval(function () {fct anonyme}, TEMPS_SLEEP);

 //faire pulsé une led
//setInterval(function () {
//  led.pwmWrite(dutyCycle);
// if (tempo == 0){
//  dutyCycle = 255; // nb: 5 de base pour incrementer
//  tempo = 1;}else{dutyCycle=0 ; tempo = 0;}

//  if (dutyCycle > 255) {
//    dutyCycle = 0;
//  }
//}, 2000);
