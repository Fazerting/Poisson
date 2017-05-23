var express = require('express'); // Serveur web
//app = express();
var app=express().use(express.static(__dirname + '/public'));
//app.listen(8080);
server = require('http').createServer(app);
io = require('socket.io').listen(server); // Utilisation des sockets, techno de transfert d'infos entre client et serveur
//server.listen(8080);

//app.get('/',function(req,res){
	//res.render('index.html');
//});

//app.use(express.static('public')); //Annonce au serveur web le dossier ou se trouve les informations pour la page web

server.listen(8080); //Demarre le serveur web sur le port 8080

//Configuration des servomoteurs sur les sorties de la raspberry :
var Gpio = require('pigpio').Gpio,
  servo1 = new Gpio(17, {mode: Gpio.OUTPUT}),
  servo2 = new Gpio(27, {mode: Gpio.OUTPUT}),
  servo3 = new Gpio(22, {mode: Gpio.OUTPUT});

//Variables nécessaire pour le code (à ne pas changer)
var mode = true;
var stop=1,
    vardeplace=0,
    varvit=3,
    //Valeur étalon pour les servos
    val1=1500,
    val2=1500,
    val3=1500,
    //Valeurs pour le mode manuel
    i=0,
    j=0,
    manu1=1500,
    manu2=1500,
    manu3=1500,
    manu12=1500,
    manu11=1500,
    manu10=1500,
    manu9=1500,
    manu8=1500,
    manu7=1500,
    manu6=1500,
    manu5=1500,
    manu4=1500,
    //variable de sens de chaque servo
    sens1=0,
    sens2=0,
    sens3=0,
//Variables de réglages, on peut s'amuser avec
    //Valeurs de réglages suivant l'installation du servo
    reg1=20,
    reg2=-120,
    reg3=100, //test poisson structure final
    //Amplitude du chaque mouvement (plus c'est petit plus le mouvement sera précis)
    ampl=50,
    //Temps entre chaque mouvement effectué
    tps=60, //test à la base c'était 60
    //Déphasage entre chaque servo
    phase=200,
    //Plage pour tourner à gauche (500 à 2500, milieu à 1500)
    gau1=1100,
    gau2=1400,
    //Plage pour tourner à droite (500 à 2500, milieu à 1500)
    dro1=1600,
    dro2=1900,
    //Plage pour avancer (500 à 2500, milieu à 1500)
    ava1=1300, // test
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

//Fonction pour le mode manuel
function manuel(value){
  console.log("valeur manuel :",value);
  manu12=manu11,
  manu11=manu10,
  manu10=manu9,
  manu9=manu8,
  manu8=manu7,
  manu7=manu6,
  manu6=manu5,
  manu5=manu4,
  manu4=manu3,
  manu3=manu2,
  manu2=manu1,
  manu1=value,
  stop=1;
}

//Fonction principale qui écrit la valeur voulue dans les servos
function main(){

  if(mode){  // Quand c'est en "AUTO" la queue bouge toute seule
      servo1.servoWrite(val1+reg1);
      servo2.servoWrite(val2+reg2);
      servo3.servoWrite(val3+reg3);
      if (vardeplace==1){
        move();
      }
      if (vardeplace==2){
        left();
      }
      if (vardeplace==3){
        right();
      }
      if (varvit==1){
		  mapause(40);
	  }
      if (varvit==2){
		  mapause(20);
	  }
  }
  else{ //Quand c'est en "MANUEL" on contrôle soi meme la queue
      bon1=parseInt(manu1)+reg1;
      bon2=parseInt(manu7)+reg2;
      bon3=parseInt(manu12)+reg3;
      servo1.servoWrite(bon1);
      servo2.servoWrite(bon2);
      servo3.servoWrite(bon3);
  }
}

io.sockets.on('connection', function (socket) { //début des sockets
//Les sockets permettent de recevoir les différentes informations de la page html
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

     socket.on('mode', function (data) {
         if (data==1){
           mode=!mode;
           console.log("Mode :",mode);
           socket.emit('modeactuel',mode);
         }
      }); //Fin du socket de choix du mode

      socket.on('deplacement', function (valeur) {
        manuel(valeur.value);
        stop=1;
      }); //Fin du socket de déplacement manuel
      
      socket.on('vitesse', function (vitesse) {
		varvit=vitesse.value
      }); //Fin du socket du choix de vitesse


}); //Fin de io.sockets

console.log("running test");

var timer=require('timers');

//Programme principal, permet de changer le mouvement tout les 'tps' ms
setInterval(function(){
    main()
}, tps);

//Fonction pour effectuer la pause pour diminuer la vitesse
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
