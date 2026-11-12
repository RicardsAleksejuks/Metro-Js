const number = Number.parseInt(prompt("Enter an integer:"), 10);
let isPrime = Number.isInteger(number) && number > 1;

for (let divisor = 2; isPrime && divisor * divisor <= number; divisor++) {
    if (number % divisor === 0) {
        isPrime = false;
    }
}

const result = isPrime
    ? `${number} is a prime number.`
    : `${number} is not a prime number.`;

document.getElementById("result").textContent = result;
