/**
 * Square Dodger 
 
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// ==========================================
// GAME CONFIGURATION & STATE
// ==========================================
const CONFIG = {
  playerSize: 30,
  enemySize: 25,
  playerColor: '#00ff00', // Lime Green
  enemyColor: '#ff4444',  // Soft Red
  initialSpeed: 3,
  spawnInterval: 1000     // Spawns a block every 1 second
};

let state = {
  score: 0,
  isRunning: true,
  player: { x: 185, y: 540 },
  enemies: []
};

// ==========================================
// CONTROLS & INPUT
// ==========================================
canvas.addEventListener('mousemove', (event) => {
  const arenaBounds = canvas.getBoundingClientRect();
  const exactMouseX = event.clientX - arenaBounds.left;
  
  // Center the player block directly under the cursor
  let targetX = exactMouseX - (CONFIG.playerSize / 2);

  // Don't let the player escape past the left or right boundaries
  const maxRightBound = canvas.width - CONFIG.playerSize;
  state.player.x = Math.max(0, Math.min(targetX, maxRightBound));
});

// ==========================================
// GAMEPLAY LOGIC
// ==========================================
function spawnEnemy() {
  if (!state.isRunning) return;

  // Pick a random starting point across the canvas width
  const randomX = Math.random() * (canvas.width - CONFIG.enemySize);
  
  // Give enemies slight variation in speed so they don't form flat rows
  const randomSpeedBonus = Math.random() * 3; 

  state.enemies.push({
    x: randomX,
    y: -CONFIG.enemySize, // Start just off-screen at the top
    speed: CONFIG.initialSpeed + randomSpeedBonus
  });

  // Keep looping this function to generate obstacles infinitely
  setTimeout(spawnEnemy, CONFIG.spawnRate || CONFIG.spawnInterval);
}

function processFrameData() {
  state.enemies.forEach((enemy, index) => {
    // Drop the enemy down based on its unique speed
    enemy.y += enemy.speed;

    // --- Box-to-Box Collision Check ---
    const overlapsOnX = state.player.x < enemy.x + CONFIG.enemySize && state.player.x + CONFIG.playerSize > enemy.x;
    const overlapsOnY = state.player.y < enemy.y + CONFIG.enemySize && state.player.y + CONFIG.playerSize > enemy.y;

    if (overlapsOnX && overlapsOnY) {
      triggerGameOver();
    }

    // --- Score Point & Cleanup ---
    // If the enemy successfully slides past the bottom frame
    if (enemy.y > canvas.height) {
      state.enemies.splice(index, 1); // Delete from memory
      state.score++;
      scoreDisplay.innerText = state.score;
    }
  });
}

// ==========================================
// VISUAL RENDERING
// ==========================================
function drawScene() {
  // Wipe the canvas clean for the fresh frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Player
  ctx.fillStyle = CONFIG.playerColor;
  ctx.fillRect(state.player.x, state.player.y, CONFIG.playerSize, CONFIG.playerSize);

  // 2. Draw Enemy Fleet
  ctx.fillStyle = CONFIG.enemyColor;
  state.enemies.forEach(enemy => {
    ctx.fillRect(enemy.x, enemy.y, CONFIG.enemySize, CONFIG.enemySize);
  });

  // Cycle the game engine loop if still alive
  if (state.isRunning) {
    processFrameData();
    requestAnimationFrame(drawScene);
  }
}

function triggerGameOver() {
  state.isRunning = false;
  alert(`Game Over!\nYou dodged ${state.score} obstacles.`);
  window.location.reload(); 
}

// ==========================================
// INITIALIZATION
// ==========================================
spawnEnemy();
drawScene();