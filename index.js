let display = document.getElementById('display');
let num1 = null;
let num2 = null;
let operator = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error: Division by zero';
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return 'Error: Invalid operator';
  }
}

function updateDisplay(value) {
  display.value = value;
}

function handleNumber(number) {
  if (operator === null) {
    // Если оператор ещё не выбран, записываем число в num1
    if (num1 === null) {
      num1 = parseFloat(number);
    } else {
      num1 = parseFloat(num1.toString() + number);
    }
    updateDisplay(num1);
  } else {
    // Если оператор выбран, записываем число в num2
    if (num2 === null) {
      num2 = parseFloat(number);
    } else {
      num2 = parseFloat(num2.toString() + number);
    }
    updateDisplay(num2);
  }
}

function handleOperator(op) {
  if (num1 !== null && num2 !== null && operator !== null) {
    // Вычисляем результат предыдущей операции
    num1 = operate(operator, num1, num2);
    updateDisplay(num1);
    num2 = null; 
  }
  operator = op;
  updateDisplay(num1 + ' ' + op); 
}

function handleEquals() {
  if (num1 !== null && num2 !== null && operator !== null) {
    // Вычисляем результат
    let result = operate(operator, num1, num2);
    updateDisplay(result);
    // Обновляем num1 результатом для дальнейших вычислений
    num1 = result;
    num2 = null;
    operator = null;
  }
}

function handleClear() {
  num1 = null;
  num2 = null;
  operator = null;
  updateDisplay('0');
}

// ... (HTML-код калькулятора) ...

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    const number = parseInt(button.textContent);
    handleNumber(number);
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    const op = button.textContent;
    handleOperator(op);
  });
});

document.getElementById('equals').addEventListener('click', handleEquals);
document.getElementById('clear').addEventListener('click', handleClear);