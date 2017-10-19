var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('keydown',this.keyPressed,true);

var c = canvas.getContext('2d');
var keys = [];

function drawCircle(x,y,radius,color) {
  c.beginPath();
  c.arc(x,y,radius,0,2*Math.PI,false);
  c.fillStyle = color;
  c.fill();
}

function drawRectangle(x,y,width,height,color){
  c.fillStyle = color;
  c.fillRect(x,y,width,height,color);
}

var x = window.innerWidth - 200;
var y = window.innerHeight/2;
var velY = 0;
var velX = -0.1;
var x2 = 200;
var y2 = window.innerHeight/2;
var velY2 = 0;
var velX2 = 0;
var speed = 10; // max speed
var friction = 0.98; // friction
var reload = 20;
var reload2 = 20;
var health = 100;
var health2= 100;
var player1_name = prompt("Please enter you name, Player 1: ", "Saber");
var player2_name = prompt("Please enter you name, Player 2: ", "Lancer");
var background = new Image();
background.src = "background.png";

function Bullet(x,y,dir,color){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.vel = 15;
  this.color = color;
	this.update = function(){
		drawCircle(this.x,this.y,20,color);
		this.vel *= 0.995;
		this.x += Math.cos(this.dir)*this.vel;
		this.y += Math.sin(this.dir)*this.vel;
	}
}

var bulletArr = [];
var bulletArr2 = [];

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(background,0,0);

  if(health > 0 && health2 > 0){

  for (i = 0; i < bulletArr2.length; i += 1) {
        bulletArr2[i].update();
        if(bulletArr2[i].vel < 5){
          bulletArr2.splice(i, 1);
        }
        if(Math.sqrt(Math.pow(bulletArr2[i].x - x,2) + Math.pow(bulletArr2[i].y - y,2)) <= 70){
          bulletArr2.splice(i, 1);
          health -= 10;
          //console.log("Hit Detected!")
        }
   }
  
  c.beginPath();
  c.moveTo(x2,y2);
  c.lineWidth = 40;
  c.strokeStyle = '#262626';
  c.lineTo(x2+(Math.cos(Math.atan2(velY2,velX2))*100),y2+(Math.sin(Math.atan2(velY2,velX2))*100));
  //console.log((Math.sin(Math.atan2(velY,velX))*20));
  c.stroke();
  
  c.beginPath();
  c.moveTo(x2,y2);
  c.lineWidth = 30;
  c.strokeStyle = '#404040';
  c.lineTo(x2+(Math.cos(Math.atan2(velY2,velX2))*95),y2+(Math.sin(Math.atan2(velY2,velX2))*95));
  //console.log((Math.sin(Math.atan2(velY,velX))*20));
  c.stroke();
  
  c.font="25px Verdana";
  c.fillStyle = "004ebc";
  c.fillText(player2_name,x2-40,y2 - 75);
  drawCircle(x2,y2,50,'#004ebc');
  drawCircle(x2,y2,45,'#006aff');
  drawRectangle(x2-50,y2+75,100,10,'black');
  drawRectangle(x2-50,y2+75,health2,10,'red');
  
  for (i = 0; i < bulletArr.length; i += 1) {
        bulletArr[i].update();
        if(bulletArr[i].vel < 5){
          bulletArr.splice(i, 1);
        }
        if(Math.sqrt(Math.pow(bulletArr[i].x - x2,2) + Math.pow(bulletArr[i].y - y2,2)) <= 70){
          bulletArr.splice(i, 1);
          health2 -= 10;
        }
   }
  
  c.beginPath();
  c.moveTo(x,y);
  c.lineWidth = 40;
  c.strokeStyle = '#262626';
  c.lineTo(x+(Math.cos(Math.atan2(velY,velX))*100),y+(Math.sin(Math.atan2(velY,velX))*100));
  //console.log((Math.sin(Math.atan2(velY,velX))*20));
  c.stroke();
  
  c.beginPath();
  c.moveTo(x,y);
  c.lineWidth = 30;
  c.strokeStyle = '#404040';
  c.lineTo(x+(Math.cos(Math.atan2(velY,velX))*95),y+(Math.sin(Math.atan2(velY,velX))*95));
  //console.log((Math.sin(Math.atan2(velY,velX))*20));
  c.stroke();
  
  c.font="25px Verdana";
  c.fillStyle = "fc0303";
  c.fillText(player1_name,x-40,y - 75);
  drawCircle(x,y,50,'#fc0303');
  drawCircle(x,y,45,'#fd3535');
  drawRectangle(x-50,y+75,100,10,'black');
  drawRectangle(x-50,y+75,health,10,'red');
// check the keys and do the movement.
    if (keys[38]) {
        if (velY > -speed) {
            velY--;
        }
    }

    if (keys[40]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }
	
	if(keys[191]){
		if(reload == 0){
			bulletArr.push(new Bullet(x+(Math.cos(Math.atan2(velY,velX))*100),y+(Math.sin(Math.atan2(velY,velX))*100),Math.atan2(velY,velX),'#fc0303'));
			reload = 20;
		}
	}
	if(reload != 0){
		reload--;
		//console.log(reload);
	}

    // apply some friction to y velocity.
    velY *= friction;
    y += velY;

    // apply some friction to x velocity.
    velX *= friction;
    x += velX;

    if (keys[87]) {
        if (velY2 > -speed) {
            velY2--;
        }
    }

    if (keys[83]) {
        if (velY2 < speed) {
            velY2++;
        }
    }
    if (keys[68]) {
        if (velX2 < speed) {
            velX2++;
        }
    }
    if (keys[65]) {
        if (velX2 > -speed) {
            velX2--;
        }
    }
  
  if(keys[81]){
    if(reload2 == 0){
      bulletArr2.push(new Bullet(x2+(Math.cos(Math.atan2(velY2,velX2))*100),y2+(Math.sin(Math.atan2(velY2,velX2))*100),Math.atan2(velY2,velX2),'#006aff'));
      reload2 = 20;
    }
  }
  if(reload2 != 0){
    reload2--;
    //console.log(reload);
  }

    // apply some friction to y velocity.
    velY2 *= friction;
    y2 += velY2;

    // apply some friction to x velocity.
    velX2 *= friction;
    x2 += velX2;

    if(x < 0){
      velX *= -1;
      x = 0;
    }
    if(x > window.innerWidth){
      velX *= -1;
      x = window.innerWidth;
    }
    if(y < 0){
      velY *= -1;
      y = 0;
    }
    if(y > window.innerHeight){
      velY *= -1;
      y = window.innerHeight;
    }
    if(x2 < 0){
      velX2 *= -1;
      x2 = 0;
    }
    if(x2 > window.innerWidth){
      velX2 *= -1;
      x2 = window.innerWidth;
    }
    if(y2 < 0){
      velY2 *= -1;
      y2 = 0;
    }
    if(y2 > window.innerHeight){
      velY2 *= -1;
      y2 = window.innerHeight;
    }
  }else{
    if(health2 <= 0){
      c.font="50px Verdana";
      c.fillStyle = "fc0303";
      c.fillText(player1_name + " Wins",canvas.width/2-100,canvas.height/2-50);
    }
    if(health <= 0){
      c.font="50px Verdana";
      c.fillStyle = "004ebc";
      c.fillText(player2_name + " Wins",canvas.width/2-100,canvas.height/2-50);
    }
  }
}


animate();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

console.log(canvas);
