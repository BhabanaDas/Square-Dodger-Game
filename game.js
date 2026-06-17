//Square Dodger - Canvas Game
// TODO: Add high score saving later
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
//Game tweeks
const PLAYER_SIZE = 30;
const ENEMY_SIZE = 25;
const PLAYER_COLOR = '#00ff00';
const ENEMY_COLOR = '#FF4444';
const BASE_SPEED = 3;

let score = 0;
let gameOver = false;
//player starting position(centered near bottom)
let playerX = 185;
let playerY = 540;
let enemies = [];
//track mouse movemenet to slide player
canvas.addEventListener('mousemove', (e) => {
 const rect = canvas.getBoundingClientRect();
 const mouseX = e.clientX - rect.left;
 //keep cursor in middle of box
 let newX = mouseX - (PLAYER_SIZE / 2);
 //stay inside canvas borders
 if(newX < 0) newX = 0;
 if(newX> canvas.width - PLAYER_SIZE) newX = canvas.width -  PLAYER_SIZE;
 playerX = newX;});
//main spawner loop
function spawnEnemy(){
 if(gameOver) return;
 const xPos = Math.random() * (canvas.width - ENEMY_SIZE);
 const speedBonus = Math.random() * 3; //mix up the speeds a bit
 enemies.push({
  x: xPos,
  y:  -ENEMY_SIZE,
  speed: BASE_SPEED + speedBonus
 });
 //loop spawn very 1 second
 setTimeout(spawnEnemy, 1000);
}
//main game loop(update positions, collision and rendering)
function updateGame(){
 if(gameOver) return;
 //clear frame
 ctx.clearRect(0,0, canvas.width, canvas.height);
 //1.draw player
 ctx.fillStyle = PLAYER_COLOR;
 ctx.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);
 //2.move and draw enemies
 ctx.fillStyle = ENEMY_COLOR;
 //loop backwards so splicing doesn't break array indexes
 for(let i = enemies.length - 1; i>=0; i--){
  let enemy = enemies[i];
  enemy.y += enemy.speed;
  //draw it
  ctx.fillRect(enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
  //AABB Collision check
  if(playerX < enemy.x + ENEMY_SIZE &&
     playerX + PLAYER_SIZE > enemy.x &&
     playerY < enemy.y + ENEMY_SIZE &&
     playerY + PLAYER_SIZE > enemy.y ){
   endGame();
   return;
  }
  //delete enemy if it leaves screen
  if(enemy.y > canvas.height){
   enemies.splice(i, 1);
   score++;
   scoreDisplay.innerText = score;
  }
 }
 requestAnimationFrame(updateGame);
}
function endGame(){
 gameOver = true;
 alert("Game Over! Score: " + score);
 window.location.reload();
}
//start everything up
spawnEnemy();
updateGame();
 
 

                                            
