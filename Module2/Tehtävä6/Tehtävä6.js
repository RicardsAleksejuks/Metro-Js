function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

const rollsList = document.getElementById("rolls");
let roll;

do {
  roll = rollDice();

  const listItem = document.createElement("li");
  listItem.textContent = roll;
  rollsList.appendChild(listItem);
} while (roll !== 6);
