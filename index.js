


var Gpio = require('pigpio').Gpio,
// led = new Gpio(PIN, {mode: Gpio.OUTPUT--INPUT}),
  motor = new Gpio(17, {mode: Gpio.OUTPUT}),
  motor2= new Gpio(27, {mode: Gpio.OUTPUT}),
  motor3= new Gpio(22, {mode: Gpio.OUTPUT}),
  dutyCycle = 0,
  tempo=0,
  pulseWidth = 1000,
  increment = 100;
  //test nage var
pos = 1; //var d'état
tete = 1660;
dos = 910;
queue = 1240;

setInterval(function () {

//  motor.servoWrite(pulseWidth);
//  motor2.servoWrite(pulseWidth);
//  motor3.servoWrite(pulseWidth);
  // enchainement des positions
if(pos==1){
    motor.servoWrite(tete);
    motor2.servoWrite(dos);
    motor3.servoWrite(queue);
    tete=1720;
    dos=1040;
    queue=1060;
    pos=2;
  }
  else{
    if(pos==2){
      motor.servoWrite(tete);
      motor2.servoWrite(dos);
      motor3.servoWrite(queue);
      tete=1630;
      dos=1200;
      queue=880;
      pos=3;
    }
    else{
      if(pos==3){
        motor.servoWrite(tete);
        motor2.servoWrite(dos);
        motor3.servoWrite(queue);
        tete=1520;
        dos=2100;
        queue=500;
        pos=4;
      }
      else{
        if(pos==4){
          motor.servoWrite(tete);
          motor2.servoWrite(dos);
          motor3.servoWrite(queue);
          tete=1350;
          dos=2230;
          queue=1170;
          pos=5;// A MODIFIER
        }
        else{
          if(pos==5){
            motor.servoWrite(tete);
            motor2.servoWrite(dos);
            motor3.servoWrite(queue);
            tete=1280;
            dos=2310;
            queue=1500;
            pos=6;// A MODIFIER
          }
          else{
            if(pos==6){
              motor.servoWrite(tete);
              motor2.servoWrite(dos);
              motor3.servoWrite(queue);
              tete=1350;
              dos=2230;
              queue=1170;
              pos=7;// A MODIFIER
            }
            else{
              if(pos==7){
                motor.servoWrite(tete);
                motor2.servoWrite(dos);
                motor3.servoWrite(queue);
                tete=1520;
                dos=2100;
                queue=500;
                pos=8;// A MODIFIER
              }
              else{
                if(pos==8){
                  motor.servoWrite(tete);
                  motor2.servoWrite(dos);
                  motor3.servoWrite(queue);
                  tete=1630;
                  dos=1200;
                  queue=880;
                  pos=9;// A MODIFIER
                }
                else{
                  if(pos==9){
                    motor.servoWrite(tete);
                    motor2.servoWrite(dos);
                    motor3.servoWrite(queue);
                    tete=1720;
                    dos=1040;
                    queue=1060;
                    pos=10;// A MODIFIER
                  }
                  else{
                    if(pos==10){
                      motor.servoWrite(tete);
                      motor2.servoWrite(dos);
                      motor3.servoWrite(queue);
                      tete=1660;
                      dos=910;
                      queue=1240;
                      pos=1;// A MODIFIER
                    }
                  }
                }
              }
            }
          }
        }
      }
  }
}



  pulseWidth += increment;
  //test=-pulseWidth;
  if (pulseWidth >= 2500) {
    increment = -25;
  } else if (pulseWidth <= 500) {
    increment = 25;
  }
  console.log(pos);
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
