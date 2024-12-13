let mood = 0;
let breathCycle = 0;
let isStarted = false;

function setup() {
  let canvas = createCanvas(600, 600); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
}

function draw() {
  background(231, 227,251);
  
  if (!isStarted) {
    // Display start text
    fill(0);
    textSize(30);
    text('CLICK TO START', width/2 - 115, height/2);
  } else {
    // Calculate clock color and size
    let clockColor;
    push()
    if (mood < -0.5) {
      clockColor = color(231, 69, 71); // red
    } else if (mood < 0) {
      clockColor = color(255, 94, 0); // orange
    } else if (mood < 0.5) {
      clockColor = color(255, 255, 0); // yellow
    } else {
      clockColor = color(40, 167, 15); // green
    }
    pop()
    
    let breathSize = sin(breathCycle) * 50 + 200;
    
    // Draw clock
    stroke(clockColor);
    fill(clockColor);
    ellipse(300, 260, breathSize, breathSize);
    filter(BLUR, 16);
    
    // Update breath cycle
    let breathSpeed;
    if (mood < -0.5) {
      breathSpeed = 0.025;
    } else if (mood < 0) {
      breathSpeed = 0.05;
    } else if (mood < 0.5) {
      breathSpeed = 0.075;
    } else {
      breathSpeed = 0.1;
    }
    breathCycle += breathSpeed;
    if (breathCycle > TWO_PI) {
      breathCycle = 0;
    }
    
    // Display message when mood is low (Hover on sad for long)
    if (mood < -0.5 && breathCycle > 2.5) {
      push()
      fill(0);
      textSize(32);
      textStyle(BOLDITALIC)
      text('Everything is Gonna Be Alright!', 60, 280);
      pop()
    }
    
    // Initially I wanted a slider but I didn't want the ubrupt change
    //fill(0);
    //rect(100, 500, 400, 20);
    //let sliderX = map(mood, -1, 1, 400, 500);
    //let sliderX = map(mood, 120, 500);
    fill(255);
    //rect(sliderX, 500, 10, 20);
    push();
    textSize(30)
    push()
    fill(0);
    noStroke();
    textSize(20)
    text('HOVER ON HOW YOU ARE FEELING', 125, 490);
    pop()
    text('😢         😟         😌         😁', 130, 550);
    //I made 4 different text but it was too difficult to space it
    pop();
  }
}

function mousePressed() {
  isStarted = true;
}

function mouseMoved() {
  if (isStarted) {
    mood = map(mouseX, 100, 500, -1, 1);
  }
}