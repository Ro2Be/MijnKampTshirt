function Player() {
	randomx = random(0, width);
	randomy = random(0, height);
  this.n = random(0, 100); //noise timer
  this.posT = createVector(randomx, randomy); //tip
  this.posB = createVector(randomx, randomy + this.h)

  this.show = function() {
    fill(255);
    triangle(this.posT.x, this.posT.y, this.posB.x, this.posB.y, this.posB.x, this.posB.y + 15);
    triangle(this.posT.x, this.posT.y, this.posB.x -20, this.posB.y, this.posB.x + 20, this.posB.y);
    line(this.posT.x, this.posT.y, this.posB.x, this.posB.y);
  }
  
  this.move = function(){
    this.posT.x = constrain(this.posT.x, 0, width);
    this.posT.y = constrain(this.posT.y, 0, height);
    
    posM = createVector(map(noise(this.n), 0, 1, 0, width), map(noise(this.n + 50), 0, 1, 0, height));
    //controle: posM = createVector(mouseX, mouseY);
    this.n += 0.01;

    if(this.posT.dist(posM) < 3) {return;}
    vDir = posM.copy().sub(this.posT).normalize(); //direction
    this.posT.add(posM.copy().sub(this.posT).normalize().mult(3));
    this.posB = this.posT.copy().sub(vDir.copy().mult(70).add(0, 10));
  }
}

var k = 50;
var img;
var imgr = 600;
var players = [];
var timer = 0;

setInterval(setTimer, 2);
function setTimer(){
  timer += 1;
  if (timer === 50) {timer = 0;}
}

function preload() {
  wereld = loadImage("images/wereld.jpg");
}

function setup() {
  createCanvas(2000, 2000);

  for (i = 0; i < k; i ++) {
  players[i] = new Player();
	}
}

function draw() {
  background(0);
  image(wereld, width/2 - imgr, height/2 - imgr, 2*imgr, 2*imgr);
  for (i = 0; i < k; i ++) {
  	players[i].move();
  	players[i].show();
	}
}

