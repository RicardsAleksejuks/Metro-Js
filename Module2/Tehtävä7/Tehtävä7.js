function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

const sides = Number(prompt("How many sides does the die have?"));
const rollsList = document.getElementById("rolls");
let roll;

do {
  roll = rollDice(sides);

  const listItem = document.createElement("li");
  listItem.textContent = roll;
  rollsList.appendChild(listItem);
} while (roll !== sides);
