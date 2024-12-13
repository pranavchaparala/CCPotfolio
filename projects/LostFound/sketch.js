function setup() {
  let canvas = createCanvas(400, 400); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
}

function draw() {
  background(205, 170, 125);
  ellipseMode(CORNER);
  
  stroke(25);
  strokeWeight(3);
  
  // Shadow of the ring
  push();
      noStroke();
      fill(180, 150, 110);
      ellipse(80, 150, 250, 125);
      filter(BLUR, 1.5);
  pop();
  
  // Sky Background
  push();
      fill(136, 206, 235);
      stroke(0);
      strokeWeight(2);
      rect(-4, -4, 408, 120);
  pop();
  
  // Front of the Ring
  push();
      fill(216);
      ellipse(80, 138, 240, 124);
  pop();
  
  // Back of the Ring
  push();
      fill(176);
      ellipse(110, 138, 180, 80);
  pop();
  
  // Hole in the Ring
  
  // Upper Hole of the Ring
  push();
      rotate(PI);
      fill(205, 170, 125);
      stroke(0); // Set the stroke color to white again
      arc(-275, -290, 150, 100, PI / 6, 5 * PI / 6, OPEN);
  pop();
  
  // Lower Hole of the Ring
  push();
      fill(205, 170, 125);
      stroke(0); // Set the stroke color to white again
      arc(112, 130, 175, 89, PI / 6, 5 * PI / 6, OPEN);
  pop();
  
  // Heartbeat
  push();
      translate(180, 228);
      stroke(40);
      noFill();
      strokeWeight(4);
      beginShape();
          vertex(0, 12);
          bezierVertex(8, 12, 12, 8, 14, 4);
          bezierVertex(16, 12, 24, 20, 24, 20);
          vertex(30, 12);
          vertex(40, 12);
      endShape();
  pop();
}