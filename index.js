/* index.js - picks a random color (red, blue, yellow) but never repeats the previous pick */
const colors = ['red', 'blue', 'yellow'];
let previousColor = null; // will be set after the first pick

const display = document.getElementById('colorDisplay');
const colorName = document.getElementById('colorName');
const randomBtn = document.getElementById('randomBtn');

function applyColor(color) {
  // update the small display box
  // display.style.backgroundColor = color;
  // colorName.textContent = color.charAt(0).toUpperCase() + color.slice(1);

  // make the whole page background match the color and adjust text color for readability
  document.body.style.backgroundColor = color;
  const textColor = color === 'yellow' ? '#000' : '#fff';
  document.body.style.color = textColor;

  // update the random button to reflect the chosen color
  randomBtn.style.backgroundColor = color;
  randomBtn.style.color = textColor;
}

function pickRandomColor() {
  // exclude previous color
  const choices = colors.filter(c => c !== previousColor);
  const pick = choices[Math.floor(Math.random() * choices.length)];
  previousColor = pick;
  applyColor(pick);
}

// Attach click to the Random button
randomBtn.addEventListener('click', pickRandomColor);
// initial text state (no color yet)
colorName.textContent = 'No color selected';

