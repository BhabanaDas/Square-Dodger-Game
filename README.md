# 🟩 Square Dodger

A lightweight, arcade-style survival game built entirely with vanilla HTML5 and JavaScript. The objective is simple: track the mouse cursor to move your green block and dodge the infinitely falling red obstacles for as long as you can!

## 🚀 Live Demo

You can play the game instantly in your browser here:  
👉 **https://bhabanadas.github.io/Square-Dodger-Game/**

---

## 🕹️ How to Play

1. Open the live link in any modern web browser (Desktop recommended).
2. Move your mouse horizontally across the game board.
3. The green player square will follow your cursor.
4. **Survive:** Avoid contact with the falling red squares.
5. If you get hit, the game ends and displays your final score. Pressing `OK` on the alert restarts the match automatically!

---

## 🛠️ Tech Stack & Features

* **HTML5 Canvas:** Handles all the rendering, updating, and clearing of game frames smoothly.
* **Vanilla JavaScript:** Zero external libraries or frameworks. Pure logical programming.
* **Responsive Mouse Tracking:** Calculates absolute boundaries so the player cannot glitch outside the canvas.
* **Dynamic Physics (AABB Collision):** Uses standard box-to-box overlapping mathematics to determine precise hit detection.

---

## 📂 Project Structure

```text
├── index.html   # The structural skeleton, styling, and UI layer
├── game.js     # The core game loop, input listener, and collision physics
└── README.md    # You are here! Project documentation
