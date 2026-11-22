const calculationInput = document.getElementById('calculation');
const result = document.getElementById('result');
const calculateButton = document.getElementById('start');

calculateButton.addEventListener('click', () => {
  const expression = calculationInput.value.replace(/\s+/g, '');
  const match = expression.match(/^(-?\d+)([+*/-])(-?\d+)$/);

  if (!match) {
    result.textContent = 'Enter a valid calculation, such as 3+5.';
    return;
  }

  const first = Number(match[1]);
  const operator = match[2];
  const second = Number(match[3]);
  let answer;

  switch (operator) {
    case '+':
      answer = first + second;
      break;
    case '-':
      answer = first - second;
      break;
    case '*':
      answer = first * second;
      break;
    case '/':
      answer = first / second;
      break;
  }

  result.textContent = answer;
});
