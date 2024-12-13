let song;
let isPlaying = false;
let upperBodyY = 318;
let upperBodySpeed = 2;
let headY = 140;
let headSpeed = 2;

function setup() {
  let canvas = createCanvas(400, 600); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
  song = loadSound('DaftPunk.mp3');
}

function draw() {
  background(255)
  textStyle(BOLD)
  text("♫ CLICK FOR DAFT PUNK ♫", 120, 560)
  //push()
  //strokeWeight(2)
  //line(0, 200, 400, 200)
  //line(0, 400, 400, 400)
  //pop()
  
  strokeWeight(6)
  rectMode(CENTER);
  
  let r=201, b=19, g=28;
  lowerBody(r, g, b)
  
    // Move the head
  headY += headSpeed;
  if (headY > 150 || headY < 130) {
    headSpeed *= -1;
  }
  Head(r, g, b, headY)
  
  // Move the upper body
  upperBodyY += upperBodySpeed;
  if (upperBodyY > 350 || upperBodyY < 286) {
    upperBodySpeed *= -1;
  }
  upperBody(r, g, b, upperBodyY)
  

}

function Head(r, g, b, y){
  
    //Neck
  rect(200, y + 80, 24, 120); //Neck
  line(210, y + 72, 190, y + 72); //Neck
  line(210, y + 87, 190, y + 87); //Neck
  line(210, y + 102, 190, y + 102); //Neck
  line(210, y + 118, 190, y + 118); //Neck
  line(210, y + 132, 190, y + 132); //Neck
  push()
    fill(r, g, b)
  rect(200, y, 120);
  pop()
  ellipse(175, y - 15, 40);
  ellipse(225, y - 15, 40);
  rect(200, y + 30, 40, 20);
  
} //Function to draw the head with colour input

function upperBody(r, g, b, y){
  // Move the upper body up and down
    //Left Hand
  rect(280, y-40, 80, 15);
  push()
  fill(r,g,b)
  circle(335, y-40, 40)
  pop()
  
  //Right Hand
  rect(120, y-40, 80, 15);
  push()
  fill(r,g,b)
  circle(60, y-40, 40)
  pop()
  
  push()
  fill(r, g, b)
  rect(200, y, 140, 156);
  pop()
  arc(200, y + 2, 80, 80, 0, PI);
  line(160, y + 2, 240, y + 2);
  push()
  fill(255,255,0)
  ellipse(200, y+5, 32)
  pop()
  
} //Function to draw the upper body

function lowerBody(r, g, b){
  rect(175, 428, 24, 140); //Leg
  line(165, 415, 185, 415); //Leg
  line(165, 400, 185, 400); //Leg
  line(165, 385, 185, 385); //Leg
  
  rect(225, 428, 24, 140); //Leg
  line(215, 415, 235, 415); //Leg
  line(215, 400, 235, 400); //Leg
  line(215, 385, 235, 385); //Leg
  
  //Shoes
  push()
  fill(r, g, b);
  rect(168, 450, 40, 40)
  rect(148, 480, 80, 40, 20, 0, 0 ,0)
  rect(252, 480, 80, 40, 0, 20, 0 ,0)
    push()
    noStroke()
    rect(168, 470, 34, 40)
    pop()
    
    rect(232, 445, 40, 30)
    push()
    noStroke()
    rect(232, 470, 34, 40)
    pop()
  pop()
} //Function to draw the lower body

function mouseClicked() {
  if (!isPlaying) {
    song.play();
    isPlaying = true;
  } else {
    song.stop();
    isPlaying = false;
  }
} 