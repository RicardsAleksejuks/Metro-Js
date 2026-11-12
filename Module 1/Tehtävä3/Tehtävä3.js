const first = Number(prompt("Enter the first integer:"));
const second = Number(prompt("Enter the second integer:"));
const third = Number(prompt("Enter the third integer:"));

const sum = first + second + third;
const product = first * second * third;
const average = sum / 3;

document.getElementById("sum").textContent = sum;
document.getElementById("product").textContent = product;
document.getElementById("average").textContent = average;
