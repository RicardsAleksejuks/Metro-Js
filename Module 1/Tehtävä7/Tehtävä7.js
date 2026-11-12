const numberOfRolls = Number.parseInt(prompt("How many dice rolls?"), 10);
let sum = 0;

for (let roll = 0; roll < numberOfRolls; roll++) {
    const result = Math.floor(Math.random() * 6) + 1;
    sum += result;
}

document.getElementById("result").textContent = `The sum of the dice rolls is ${sum}.`;
