let player;
let backgroundImage;
let moveSpeed = 2;
let scaleFactor = 2;
let currentKey; // Currently pressed key
let showUnlockMessage = false; // Show unlock message flag
let sceneNum = 0; // Current scene number

// Player images and sounds
let playerImages = {};
let sounds = {};

// Collectibles
let collectibles = [];
const NUM_COLLECTIBLES = 10; // Total collectibles
let collectibleImage; // Collectible image

// Chase Game Variables
let playerCharacter, aiCharacter, land;
let img; // Player character image
let aiImage; // AI character image

function preload() {
  console.log("Assets are taking long to load, Please wait and refresh if it doesn't work");

  // Load player images
  playerImages.left = loadImage('Left.gif');
  playerImages.right = loadImage('Right.gif');
  playerImages.up = loadImage('Left.gif'); 
  playerImages.down = loadImage('Right.gif');
  playerImages.idle = loadImage('Idle.png');
  backgroundImage = loadImage('GameBG.png');
  collectibleImage = loadImage('Collectible.gif');
  menuBackground = loadImage('MenuBG.png');
  title = loadImage('Title.gif');
  escapeBackground = loadImage('EscapeBG.png')
                    
  // Load AI character images
  img = loadImage('/F1Top.png'); // Ensure this path is correct
  aiImage = loadImage('/F1Bottom.png'); // Load the AI character image

  // Load sounds
  sounds.mainMenuSound = loadSound('MenuMusic.mp3');
  sounds.gameSceneMusic = loadSound('SceneMusic.mp3');
  sounds.unlockSceneMusic = loadSound('MenuMusic.mp3');
  sounds.raceMusic = loadSound('RaceMusic.mp3'); // Load race music
}

function setup() {
  let canvas = createCanvas(800, 600); // Create a canvas of 400x400 pixels
  canvas.parent('sketch-container'); 
  player = new Player(width / 2, 50); // Initialize player at the top center (y = 50)

  // Create collectibles at random positions
  for (let i = 0; i < NUM_COLLECTIBLES; i++) {
    let x = random(50, width - 50); // Random x position
    let y = random(50, height - 50); // Random y position
    collectibles.push(new Collectible(x, y)); // Add new collectible to the array
  }

  // Initialize AI character and land
  playerCharacter = new Character(250, 250, img); // Use player image
  aiCharacter = new Character(450, 450, aiImage); // Use F1Bottom.png for AI character
  land = new Land();
}

function draw() {
  switch (sceneNum) {
    case 0: // Main Menu
      image(menuBackground, 0, 0, width, height);
      image(title, 4, 160)
      fill(255); // Set text color to white
      textSize(32); // Set text size
      textAlign(CENTER, CENTER); // Center the text
      text("Press ENTER to Start", width / 2, 380); // Main menu message
      
      // Play main menu sound
      if (!sounds.mainMenuSound.isPlaying()) {
        sounds.mainMenuSound.loop(); // Loop the main menu sound
      }
      break;

    case 1: // Game Scene
      image(backgroundImage, 0, 0, 800, 600); // Background image
      text("Collect the gems and get in the car.", width / 2, 60); 
      player.update(); // Update player position
      player.display(); // Draw the player

      // Draw collectibles
      for (let i = collectibles.length - 1; i >= 0; i--) {
        collectibles[i].display(); // Display each collectible
        if (player.collect(collectibles[i])) {
          collectibles.splice(i, 1); // Remove collected item
        }
      }

      // Show unlock message if needed
      if (showUnlockMessage) {
        fill(255); // Set text color to white
        textSize(32); // Set text size
        textAlign(CENTER, CENTER); // Center the text
        text("Press SPACE to enter", width / 2, height / 2); // Draw the message
      }

      // Play game scene music
      if (!sounds.gameSceneMusic.isPlaying()) {
        sounds.mainMenuSound.stop(); // Stop the main menu sound
        sounds.gameSceneMusic.loop(); // Loop the game scene music
      }
      break;

    case 2: // Chasing Game Scene
      image(escapeBackground, 0, 0, 800, 600); // Draw the background image
      text("Escape into the forest.", width / 2, 60); 
      land.display();
      
      playerCharacter.update();
      playerCharacter.display();
      
      aiCharacter.follow(playerCharacter);
      aiCharacter.update();
      aiCharacter.display();
      
      // Play race music
      if (!sounds.raceMusic.isPlaying()) {
        sounds.gameSceneMusic.stop();
        sounds.raceMusic.loop(); // Loop the race music
      }

      if (land.isOffLand(playerCharacter)) {
        sceneNum++; // Move to the next scene
      }
      break;

    case 3: // Unlock Scene
     image(menuBackground, 0, 0, width, height);
      fill(255); // Set text color to white
      textSize(32); // Set text size
      textAlign(CENTER, CENTER); // Center the text
      text("You have successfully escaped, Game Over!.", width / 2, height / 2); // Draw the unlock message

      // Play unlock scene music
      if (!sounds.unlockSceneMusic.isPlaying()) {
        sounds.raceMusic.stop(); // Stop the game scene music
        sounds.unlockSceneMusic.loop(); // Loop the unlock scene music
      }
      break;
  }
}
function keyPressed() {
  if (sceneNum === 0 && keyCode === ENTER) {
    sceneNum = 1; // Start the game
    sounds.mainMenuSound.stop(); // Stop the main menu sound
  } else if (sceneNum === 1) {
    if ([LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW].includes(keyCode)) {
      currentKey = keyCode; // Track the current key
    }
    if (keyCode === 32 && showUnlockMessage) {
      sceneNum = 2; // Move to AI game scene
    }
  } else if (sceneNum === 3 && keyCode === ENTER) {
    // Reset the game when in the unlock scene
    resetGame(); // Call a function to reset the game state
  }
}

//BROKEN 
function resetGame() {
  sceneNum = 0; // Reset to main menu
  showUnlockMessage = false; // Reset unlock message flag
  collectibles = []; // Clear collectibles array

  // Reinitialize collectibles
  for (let i = 0; i < NUM_COLLECTIBLES; i++) {
    let x = random(50, width - 50); // Random x position
    let y = random(50, height - 50); // Random y position
    collectibles.push(new Collectible(x, y)); // Add new collectible to the array
  }

  // Reset player position
  player = new Player(width / 2, 50); // Reinitialize player
}
  


function keyReleased() {
  if (keyCode === currentKey) {
    currentKey = null; // Clear the current key
  }
}

class Player {
  constructor(startX, startY) {
    this.x = startX; // Initial X position
    this.y = startY; // Initial Y position
    this.currentImage = playerImages.idle; // Default image is idle
  }

  update() {
    if (currentKey === LEFT_ARROW) {
      this.x -= moveSpeed; // Move left
      this.y += moveSpeed; // Move down
      this.currentImage = playerImages.left; // Set image to left
    } else if (currentKey === RIGHT_ARROW) {
      this.x += moveSpeed; // Move right
      this.y -= moveSpeed; // Move up
      this.currentImage = playerImages.right; // Set image to right
    } else if (currentKey === UP_ARROW) {
      this.x -= moveSpeed; // Move left
      this.y -= moveSpeed; // Move up
      this.currentImage = playerImages.up; // Set image to up
    } else if (currentKey === DOWN_ARROW) {
      this.x += moveSpeed; // Move right
      this.y += moveSpeed; // Move down
      this.currentImage = playerImages.down; // Set image to down
    } else {
      this.currentImage = playerImages.idle; // Set image to idle
    }

    // Boundary checks
    this.x = constrain(this.x, 0 + (this.currentImage.width * scaleFactor) / 4, width - (this.currentImage.width * scaleFactor) / 4);
    this.y = constrain(this.y, 0 + (this.currentImage.height * scaleFactor) / 4, height - (this.currentImage.height * scaleFactor) / 4);

    if (this.y >= height - (this.currentImage.height * scaleFactor) / 4 && this.x >= width / 2 - (this.currentImage.width * scaleFactor) / 4 && this.x <= width / 2 + (this.currentImage.width * scaleFactor) / 4) {
      showUnlockMessage = true; // Show unlock message
    } else {
      showUnlockMessage = false; // Hide message
    }
  }

  display() {
    let scaledWidth = this.currentImage.width * scaleFactor;
    let scaledHeight = this.currentImage.height * scaleFactor;
    image(this.currentImage, this.x - scaledWidth / 2, this.y - scaledHeight / 2, scaledWidth, scaledHeight); // Draw player
  }

  collect(collectible) {
    let d = dist(this.x, this.y, collectible.x, collectible.y);
    return d < (this.currentImage.width * scaleFactor) / 2 + (collectible.size / 2); // Check collision
  }
}

class Collectible {
  constructor(x, y) {
    this.x = x; // X position
    this.y = y; // Y position
    this.size = 30; // Size of the collectible
  }

  display() {
    image(collectibleImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); // Draw collectible
  }
}

class Character {
  constructor(x, y, characterImage) {
    this.position = createVector(x, y);
    this.angle = 0;
    this.speed = 0; // Initialize speed
    this.image = characterImage; // Character image
    this.moveSpeed = 3; // Set a constant speed for movement
  }

  update() {
    this.speed = 0; // Reset speed

    if (keyIsDown(UP_ARROW)) {
      this.speed = this.moveSpeed; // Move up
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.speed = -this.moveSpeed; // Move down
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 2; // Rotate left
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 2; // Rotate right
    }

    // Update position based on speed and angle
    this.position.x += cos(radians(this.angle)) * this.speed;
    this.position.y += sin(radians(this.angle)) * this.speed;

    // Keep the character within the canvas bounds
    this.position.x = constrain(this.position.x, 0, width);
    this.position.y = constrain(this.position.y, 0, height);
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(radians(this.angle));
    image(this.image, -50, -50, 100, 100); // Center the image
    pop();
  }

  follow(target) {
    let desired = p5.Vector.sub(target.position, this.position);
    if (desired.mag() > 50) {
      desired.setMag(2);
      this.position.add(desired);
    } else {
      this.speed = 0; // Stop if close enough
    }
    this.angle = desired.heading(); // Update angle to face target
  }
}

class Land {
  display() {
}

  isOffLand(character) {
    return (character.position.x < 100 || character.position.x > 700 || character.position.y < 100 || character.position.y > 500); // Check if off land
  }
}