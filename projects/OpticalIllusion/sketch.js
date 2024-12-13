let speed = 0;
function setup() {
  let canvas = createCanvas(400, 400); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
}

function draw() {
  background(80,7,140);
  
  noFill();
  stroke(255, 50, 90);
  strokeWeight(3)
  
  // Move to the center of the canvas
  translate(200, 200);
  
  speed += 0.5; // adjust the speed of the rotation
  
  for (let i = 300; i > 60; i = i/1.08) { 
    // Decreasing the radius slowly so it smoothly scales down
    rotate(radians(speed)); // use the updated angle
    circle(9, 5, i); // i in the loop creates offset and chaos
  }
}