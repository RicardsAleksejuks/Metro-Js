const numberOfDice = Number.parseInt(prompt("How many dice?"), 10);
const targetSum = Number.parseInt(prompt("What sum are you interested in?"), 10);
const numberOfTrials = 10000;
let matchingRolls = 0;

for (let trial = 0; trial < numberOfTrials; trial++) {
    let sum = 0;

    for (let die = 0; die < numberOfDice; die++) {
        sum += Math.floor(Math.random() * 6) + 1;
    }

    if (sum === targetSum) {
        matchingRolls++;
    }
}

const probability = (matchingRolls / numberOfTrials) * 100;
document.getElementById("result").textContent =
    `Probability to get sum ${targetSum} with ${numberOfDice} dice is ${probability.toFixed(2)}%`;
