const firstNumber = document.getElementById('num1');
const secondNumber = document.getElementById('num2');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const calculateButton = document.getElementById('start');

calculateButton.addEventListener('click', () => {
  const first = Number(firstNumber.value);
  const second = Number(secondNumber.value);
  let answer;

  switch (operation.value) {
    case 'add':
      answer = first + second;
      break;
    case 'sub':
      answer = first - second;
      break;
    case 'multi':
      answer = first * second;
      break;
    case 'div':
      answer = first / second;
      break;
  }

  result.textContent = answer;
});
