// List of app names
let apps = ["Whatsapp", "Instagram", "Photos", "Twitter", "Mail"]; 

// Number of times each app was opened over 7 days
let appOpenCounts = [
  [19, 35, 12, 11, 20],
  [25, 20, 8, 16, 19],
  [41, 22, 6, 32, 11],
  [32, 38, 6, 22, 8],
  [19, 26, 8, 7, 5],
  [50, 24, 8, 8, 10],
  [35, 21, 6, 12, 18]
]; 

let bubbleSizes = []; // Sizes of the bubbles
let currentDay = 0; // Current day index

function setup() {
  let canvas = createCanvas(600, 600); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
  noStroke(); // No border for the bubbles
  initializeBubbles(); // Set initial bubble sizes

  // Create buttons for navigating days
  createButton('Previous Day').position(100, height).mousePressed(previousDay);
  createButton('Next Day').position(400, height).mousePressed(nextDay);
}

function draw() {
  background(244, 236, 244);
  drawBubbles();
  displayCurrentDay();
}

// To start bubble sizes from zero
function initializeBubbles() {
  bubbleSizes = Array(apps.length).fill(0);
}

// Draw the bubbles on the canvas
function drawBubbles() {
  let centerX = width / 2; 
  let centerY = height / 2;
  let angleIncrement = TWO_PI / apps.length; //To arrange them in cluster

  for (let i = 0; i < apps.length; i++) {
    let angle = angleIncrement * i; // Calculate angle for each bubble
    updateBubbleSize(i);
    
    let radius = bubbleSizes[i] / 2 + 80; 
    let x = centerX + cos(angle) * radius; // Make the bubbles grow gradually 
    let y = centerY + sin(angle) * radius; // Make the bubbles grow gradually

    drawBubble(x, y, bubbleSizes[i], apps[i], appOpenCounts[currentDay][i]);
  }
}

// Update the size of each bubble
function updateBubbleSize(i) {
  if (bubbleSizes[i] < appOpenCounts[currentDay][i]) {
    bubbleSizes[i] += 0.5; // Increase size gradually
  }
}

// Draw a single bubble with its name and count
function drawBubble(x, y, size, appName, appCount) {
  fill(246, 187, 255, 150); // Bubble color
  ellipse(x, y, size * 4, size * 4); // Draw bubble

  fill(8, 47, 152);  // Text color
  textAlign(CENTER, CENTER);
  textSize(16);
  text(appName, x, y);
  textSize(16);
  text(Math.floor(appCount), x, y + 20);
}

// Display the current day above the buttons
function displayCurrentDay() {
  fill(0); // Text color
  textSize(20); // Text size for the day
  textAlign(CENTER, CENTER); // Center text alignment
  text(`Day ${currentDay + 1}`, width / 2, height - 70); // Display current day
}

// Next Day Button
function nextDay() {
  currentDay = (currentDay + 1) % 7;  // 7 days of the week
  initializeBubbles(); //Reset Bubbles
}

// Previous Day Button
function previousDay() {
  currentDay = (currentDay - 1 + 7) % 7; 
  initializeBubbles(); 
}