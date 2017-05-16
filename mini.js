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
//Variables nécessaire pour le code
var stop=1,
    vardeplace=0,
    //Valeur étalon pour les servos (à ne pas changer)
    val1=1500,
    val2=1500,
    val3=1500,
    //variable de sens de chaque servo
    sens1=0,
    sens2=0,
    sens3=0,
//Variables de réglages, on peut s'amuser avec
    //Valeurs de réglages suivant l'installation du servo
    reg1=-200,
    reg2=-50,
    reg3=0,
    //Amplitude du chaque mouvement (plus c'est petit plus le mouvement sera précis)
    ampl=10,
    //Temps entre chaque mouvement effectué
    tps=10,
    //Déphasage entre chaque servo
    phase=100,
    //Plage pour tourner à gauche (500 à 2500, milieu à 1500)
    gau1=1000,
    gau2=1400,
    //Plage pour tourner à droite (500 à 2500, milieu à 1500)
    dro1=1600,
    dro2=2000,
    //Plage pour avancer (500 à 2500, milieu à 1500)
    ava1=1300,
    ava2=1700;
var timer=require('timers');

//Fonction pour initialiser le déphasage
function init(){
  val1=1500+phase;
  val2=1500;
  val3=1500-phase;
  sens1=1;
  sens2=1;
  sens3=1;
  stop=0;
  console.log("init");
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

//Fonction pour arrêter le poisson
function stoppe(){
    val1=1500;
    val2=1500,
    val3=1500;

    console.log("stoppe");

    console.log("angle du 1",val1);
    console.log("angle du 2",val2);
    console.log("angle du 3",val3);
}

// Fonction pour aller tout droit
function move(){
  //pour le servo 1
  if (sens1==1){
    if(val1==ava2 || val1==dro2){
      sens1=-1;
      val1-=ampl;
    }
    else{
      val1+=ampl;
    }
  }
  else{
    if(val1==ava1 || val1==gau1){
      sens1=1;
      val1+=ampl;
    }
    else{
      val1-=ampl;
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if((val2==gau2 && sens1==-1) || (val2==ava2 && sens1==-1) || val2==dro2){
      sens2=-1;
      val2-=ampl;
    }
    else{
      val2+=ampl;
    }
  }
  else{
    if(val2==gau1 || (val2==ava1 && sens1==1) || (val2==dro1 && sens1==1)){
      sens2=1;
      val2+=ampl;
    }
    else{
      val2-=ampl;
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==gau2 && sens2==-1) || (val3==ava2 && sens2==-1) || val3==dro2){
      sens3=-1;
      val3-=ampl;
    }
    else{
      val3+=ampl;
    }
  }
  else{
    if(val3==gau1 || (val3==ava1 && sens2==1) || (val3==dro1 && sens2==1)){
      sens3=1;
      val3+=ampl;
    }
    else{
      val3-=ampl;
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

//Fonction pour aller à droite
function right(){
  //pour le servo 1
  if (sens1==1){
    if(val1==dro2){
      sens1=-1;
      val1-=ampl;
    }
    else{
      val1+=ampl;
    }
  }
  else{
    if(val1==ava1 || val1==gau1 || val1==dro1){
      sens1=1;
      val1+=ampl;
    }
    else{
      val1-=ampl;
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if(val2==dro2 || (val2==gau2 && sens1==-1) || (val2==ava2 && sens1==-1)){
      sens2=-1;
      val2-=ampl;
    }
    else{
      val2+=ampl;
    }
  }
  else{
    if((val2==ava1 && sens1==1) || val2==gau1 ||  (val2==dro1 && sens1==1)){
      sens2=1;
      val2+=ampl;
    }
    else{
      val2-=ampl;
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==gau2 && sens2==-1) || (val3==ava2 && sens2==-1) || val3==dro2){
      sens3=-1;
      val3-=ampl;
    }
    else{
      val3+=ampl;
    }
  }
  else{
    if((val3==ava1 && sens2==1) || val3==gau1 ||  (val3==dro1 && sens2==1)){
      sens3=1;
      val3+=ampl;
    }
    else{
      val3-=ampl;
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

//Fonction pour tourner à gauche
function left(){
 //pour le servo 1
  if (sens1==1){
    if(val1==dro2 || val1==ava2 || val1==gau2){
      sens1=-1;
      val1-=ampl;
    }
    else{
      val1+=ampl;
    }
  }
  else{
    if(val1==gau1){
      sens1=1;
      val1+=ampl;
    }
    else{
      val1-=ampl;
    }
  }
  //Pour le servo 2
  if (sens2==1){
    if((val2==gau2 && sens1==-1) || val2==dro2 || (val2==ava2 && sens1==-1)){
      sens2=-1;
      val2-=ampl;
    }
    else{
      val2+=ampl;
    }
  }
  else{
    if(val2==gau1 || (val2==ava1 && sens1==1) || (val2==dro1 && sens1==1)){
      sens2=1;
      val2+=ampl;
    }
    else{
      val2-=ampl;
    }
  }
  //Pour le servo 3
  if (sens3==1){
    if((val3==gau2 && sens2==-1) || val3==dro2 || (val3==ava2 && sens2==-1)){
      sens3=-1;
      val3-=ampl;
    }
    else{
      val3+=ampl;
    }
  }
  else{
    if(val3==gau1 || (val3==ava1 && sens2==1) || (val3==dro1 && sens2==1)){
      sens3=1;
      val3+=ampl;
    }
    else{
      val3-=ampl;
    }
  }
  console.log("angle du 1",val1);
  console.log("angle du 2",val2);
  console.log("angle du 3",val3);
}

//Fonction pour le mode manuel (à terminer)
function manuel(valeur){
  console.log("valeur manuel :",valeur);
  servo1.servoWrite(valeur);
  servo2.servoWrite(valeur);
  servo3.servoWrite(valeur);
  stop=1;
}

//Fonction principale qui écrit la valeur voulue dans les servos
function main(){
  servo1.servoWrite(val1+reg1);
  servo2.servoWrite(val2+reg2);
  servo3.servoWrite(val3+reg3);

  if(mode){  // Quand c'est en "AUTO" la queue bouge toute seule
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
  else{  // Quand c'est en "MANUEL" on contrôle la queue
  }
}

io.sockets.on('connection', function (socket) { //début des sockets

     socket.on('deplacer', function (deplace) {
        vardeplace=deplace
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
        manuel(data.value);
      }); //Fin du socket de déplacement manuel

}); //Fin de io.sockets

console.log("running test");

var timer=require('timers');

setInterval(function(){
    main()
}, tps);
