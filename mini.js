var express = require('express'); //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server); // web socket server

// led part :
var Gpio = require('pigpio').Gpio,
  servo1 = new Gpio(17, {mode: Gpio.OUTPUT}),
  servo2 = new Gpio(27, {mode: Gpio.OUTPUT}),
  servo3 = new Gpio(22, {mode: Gpio.OUTPUT});

server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages

var mode = true;
var tpsPause =100,
    stop=1,
    val1=1500,
    val2=1500,
    val3=1500,
    sens1=0,
    sens2=0,
    sens3=0,
    reg1=-200,
    reg2=-50,
    reg3=0,
    vardeplace=0;

var timer=require('timers');

function init(){
  val1=1600;
  val2=1500;
  val3=1400;
  sens1=1;
  sens2=1;
  sens3=1;
  stop=0;
  servo1.servoWrite(val1);
  servo2.servoWrite(val2);
  servo3.servoWrite(val3);

  console.log("init");

  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

function stoppe(){
    val1=1500;
    val2=1500,
    val3=1500;

    console.log("stoppe");

    console.log("angle du 1",val1);
    console.log("angle du 2",val2);
    console.log("angle du 3",val3);
}

function move(){
  //pour le servo 1
  if (sens1==1){
    if(val1==1700 || val1==2000){
      sens1=-1;
      val1-=100;
    }
    else{
      val1+=100;
    }
  }
  else{
    if(val1==1300 || val1==1000){
      sens1=1;
      val1+=100;
    }
    else{
      val1-=100
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if((val2==1400 && sens1==-1) || (val2==1700 && sens1==-1) || val2==2000){
      sens2=-1;
      val2-=100;
    }
    else{
      val2+=100;
    }
  }
  else{
    if(val2==1000 || (val2==1300 && sens1==1) || (val2==1600 && sens1==1)){
      sens2=1;
      val2+=100;
    }
    else{
      val2-=100
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==1400 && sens2==-1) || (val3==1700 && sens2==-1) || val3==2000){
      sens3=-1;
      val3-=100;
    }
    else{
      val3+=100;
    }
  }
  else{
    if(val3==1000 || (val3==1300 && sens2==1) || (val3==1600 && sens2==1)){
      sens3=1;
      val3+=100;
    }
    else{
      val3-=100
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

function right(){
  //pour le servo 1
  if (sens1==1){
    if(val1==2000){
      sens1=-1;
      val1-=100;
    }
    else{
      val1+=100;
    }
  }
  else{
    if(val1==1300 || val1==1000 || val1==1600){
      sens1=1;
      val1+=100;
    }
    else{
      val1-=100
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if(val2==2000 || (val2==1400 && sens1==-1) || (val2==1700 && sens1==-1)){
      sens2=-1;
      val2-=100;
    }
    else{
      val2+=100;
    }
  }
  else{
    if((val2==1300 && sens1==1) || val2==1000 ||  (val2==1600 && sens1==1)){
      sens2=1;
      val2+=100;
    }
    else{
      val2-=100
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==1400 && sens2==-1) || (val3==1700 && sens2==-1) || val3==2000){
      sens3=-1;
      val3-=100;
    }
    else{
      val3+=100;
    }
  }
  else{
    if((val3==1300 && sens2==1) || val3==1000 ||  (val3==1600 && sens2==1)){
      sens3=1;
      val3+=100;
    }
    else{
      val3-=100
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

function left(){
 //pour le servo 1
  if (sens1==1){
    if(val1==2000 || val1==1700 || val1==1400){
      sens1=-1;
      val1-=100;
    }
    else{
      val1+=100;
    }
  }
  else{
    if(val1==1000){
      sens1=1;
      val1+=100;
    }
    else{
      val1-=100
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if((val2==1400 && sens1==-1) || val2==2000 || (val2==1700 && sens1==-1)){
      sens2=-1;
      val2-=100;
    }
    else{
      val2+=100;
    }
  }
  else{
    if(val2==1000 || (val2==1300 && sens1==1) || (val2==1600 && sens1==1)){
      sens2=1;
      val2+=100;
    }
    else{
      val2-=100
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==1400 && sens2==-1) || val3==2000 || (val3==1700 && sens2==-1)){
      sens3=-1;
      val3-=100;
    }
    else{
      val3+=100;
    }
  }
  else{
    if(val3==1000 || (val3==1300 && sens2==1) || (val3==1600 && sens2==1)){
      sens3=1;
      val3+=100;
    }
    else{
      val3-=100
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);

}

//
function main(){
  servo1.servoWrite(val1+reg1);
  servo2.servoWrite(val2+reg2);
  servo3.servoWrite(val3+reg3);

  // Quand c'est en "AUTO" on bouge la queue
  if(mode){
    console.log("deplace vaut :",vardeplace);
      if (vardeplace==1){
        move();
      }
      if (vardeplace==2){
        left();
      }
      if (vardeplace==3){
        right();
      }
  }
  else{

  }
}

io.sockets.on('connection', function (socket) {//gets called whenever a client connects

     socket.on('deplacer', function (deplace) {
        vardeplace=deplace
         console.log("je passe la :",deplace);
         if (deplace==0){
           console.log("deplacement :",deplace);
           stoppe();
           stop=1;
         }
         if (deplace==1){
           console.log("deplacement :",deplace);
           if (stop==1){
             init();
           }
           move();
         }
         if (deplace==2){
           console.log("deplacement :",deplace);
           if (stop==1){
             init();
           }
           left();
         }
         if (deplace==3){
           console.log("deplacement :",deplace);
           if (stop==1){
             init();
           }
           right();
         }
     });//Fin du socket principal de déplacement Auto

     socket.on('mode', function (data) {//makes the socket react to 'led' packets by calling this function
         if (data==1){
           mode=!mode;
           console.log("Mode :",mode);
           socket.emit('modeactuel',mode);
         }
      }); //Fin du socket de choix du mode

      socket.on('deplacement', function (data) {
              valeur = data.value;
              console.log("valeur manuel :",deplace);

              servo1.servoWrite(valeur);
              servo2.servoWrite(valeur);
              servo3.servoWrite(valeur);
              stop=1;
      }); //Fin du socket de déplacement manuel

}); //Fin de io.sockets

    console.log("running test");

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

    // while(1){
    //   main();
    //   mapause(1000);
    // }

    var timer=require('timers');

    setInterval(function(){
      main()
    }, 100);
