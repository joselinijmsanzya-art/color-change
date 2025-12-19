/* index.js
   - Top buttons: set the page to red/blue/yellow
   - Random button: picks from the remaining 4 rainbow colors
     (orange, green, indigo, violet) and avoids repeating the previous color
*/

const colors = ['red', 'blue', 'yellow'];
const otherColors = ['orange', 'green', 'indigo', 'violet'];
let previousColor = null;

const display = document.getElementById('colorDisplay');
const colorName = document.getElementById('colorName');
const randomBtn = document.getElementById('randomBtn');

function applyColor(color) {
  // update the display box text and background
  //if (display) display.style.backgroundColor = color;
  //if (colorName) colorName.textContent = color.charAt(0).toUpperCase() + color.slice(1);

  // set page background
  document.body.style.backgroundColor = color;

  // choose readable text color based on luminance
  const textColor = isLightColor(color) ? '#000' : '#fff';
  document.body.style.color = textColor;

  // style the random button to match
  if (randomBtn) {
    randomBtn.style.backgroundColor = color;
    randomBtn.style.color = textColor;
  }
}

function pickRandomColor() {
  // choose from otherColors and exclude previousColor
  let choices = otherColors.slice().filter(c => c !== previousColor);
  // if previousColor is not in otherColors, choices is the whole list
  const pick = choices.length ? choices[Math.floor(Math.random() * choices.length)] : otherColors[Math.floor(Math.random() * otherColors.length)];
  previousColor = pick;
  applyColor(pick);
}

// Attach click to the Random button
if (randomBtn) randomBtn.addEventListener('click', pickRandomColor);

// Top color buttons: set page color directly and set previousColor
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    previousColor = color;
    applyColor(color);
  });
});

// initial text state
if (colorName) colorName.textContent = 'No color selected';

// Utility: return true if a named color is light
function isLightColor(colorName) {
  const el = document.createElement('div');
  el.style.backgroundColor = colorName;
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const comp = getComputedStyle(el).backgroundColor; // "rgb(r, g, b)"
  document.body.removeChild(el);
  const m = comp.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const r = +m[1], g = +m[2], b = +m[3];
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
  return brightness > 150;
}



