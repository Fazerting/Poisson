var Gpio = require('pigpio').Gpio,
// led = new Gpio(PIN, {mode: Gpio.OUTPUT--INPUT}),
  led = new Gpio(17, {mode: Gpio.OUTPUT}),
  dutyCycle = 0;

// setInterval(function () {fct anonyme}, TEMPS_SLEEP);

setInterval(function () {
  led.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
