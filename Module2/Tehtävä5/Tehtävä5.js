const numbers = [];

while (true) {
  const number = Number(prompt("Enter a number:"));

  if (numbers.includes(number)) {
    alert(`${number} has already been given. The program will stop.`);
    break;
  }

  numbers.push(number);
}

numbers.sort((a, b) => a - b);

for (const number of numbers) {
  console.log(number);
}
