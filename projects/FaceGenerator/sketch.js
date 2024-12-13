let bodyColor;

function setup() {
  let canvas = createCanvas(400, 400); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
  background(255, 0, 0);
  bodyColor = color(79, 60, 53);
}

// Draw
function draw() {
  // Background
  background(random(255), random(255), random(255)); //Random flickering background

  // Body
  fill(bodyColor);
  stroke(0);
  strokeWeight(20);
  rect(200, 440, 320, 400, 120);

  // Face
  fill(241, 251, 148);
  stroke(0);
  strokeWeight(20);
  rect(200, 160, max(mouseX, 200), max(mouseY, 280), 96); 
  //Face size taken from mouse position but used max() to take value only if it is more than 200 so the face isn't too small

  // Left Eye
  let eyeWidth = map(mouseX, 0, width, 10, 30);
  let eyeHeight = map(mouseY, 0, height, 10, 30);
  fill(255);
  stroke(0);
  strokeWeight(16);
  rect(160, 130, 20+eyeWidth/4, 20+eyeHeight/2, 200); //Had do play around dividing the variable so eyes and mouth scale differently
  
  // Right Eye
  fill(255);
  stroke(0);
  strokeWeight(16);
  rect(240, 130, 20+eyeWidth/4, 20+eyeHeight/2, 200);

  // Nose
  push()
  fill(0);
  noStroke();
  rect(190, 170, 15, 15, 200);
  rect(210, 170, 15, 15, 200);
  pop()

  // Mouth
  fill(255);
  rectMode(CENTER);
  rect(200, 240, 40, 45 + map(mouseY, 0, height, 10, 30), 19);

  // Right Hand
  fill(241, 251, 148);
  stroke(0);
  rect(290, 260, 80, 150, 20);
  rect(300, 320, 60, 200, 20);
  
  push()
  noStroke()
  rect(290, 265, 64, 140, 20); //Made a rectangle to cover overlap
  pop()

  // Left Hand
  fill(241, 251, 148);
  stroke(0);
  rect(110, 260, 80, 150, 20);
  rect(100, 320, 60, 200, 20);
  
  push()
  noStroke()
  rect(110, 265, 64, 140, 20); //Made a rectangle to cover overlap
  pop()
}

// Mouse Pressed
function mousePressed() {
  bodyColor = color(random(255), random(255), random(255)); // change dress color on mouse press
}