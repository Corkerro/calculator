const MEMORY_KEY = 'calculatorMemory';

const calculatorScreen = document.querySelector('.display__result.fz-big-1');
const numbers = document.querySelectorAll('[id^="number-"]');
const operators = document.querySelectorAll('.fz-medium-1.control');
const equalSign = document.getElementById('calculate');
const clearBtn = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const plusMinus = document.getElementById("toggle-sing");
const mcBtn = document.getElementById("mc-btn");
const mrBtn = document.getElementById("mr-btn");
const mPlusBtn = document.getElementById("m_plus-btn");
const mMinusBtn = document.getElementById("m_minus-btn");

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

const updateScreen = (number) => {
  const num = parseFloat(number);
  if (isNaN(num)) {
    calculatorScreen.textContent = number;
  } else if (Number.isInteger(num)) {
    calculatorScreen.textContent = num.toString(); 
  } else {
    calculatorScreen.textContent = num.toFixed(1); 
  }
};

const inputNumber = (number) => { 
  if (currentNumber === '0' || currentNumber === '-') {
    currentNumber = (currentNumber === '-' ? '-' : '') + number;
  } else {
    currentNumber += number;        
  }
};

const inputDecimal = (dot) => {
  if (currentNumber.includes(".")) return;
  currentNumber += dot.trim();
};

const clearAll = () => {
  prevNumber = '';
  calculationOperator = '';
  currentNumber = "0";
};

const inputOperator = (operator) => {
  if (operator === '-' && (currentNumber === "0" || currentNumber === "")) {
    currentNumber = "-";
    updateScreen(currentNumber);
    return;
  }
  if (prevNumber !== '' && currentNumber !== '' && currentNumber !== "-") {
    calculate();
    updateScreen(currentNumber);
  }
  calculationOperator = (operator === '÷') ? '/' : operator;
  prevNumber = currentNumber;
  currentNumber = '';
};

const calculate = () => { 
  let result = '';
  const num1 = parseFloat(prevNumber);
  const num2 = parseFloat(currentNumber);
  switch(calculationOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    case '%': 
      result = num1 * (num2 / 100);
      break;
    default:
      return;
  }
  currentNumber = result.toString();
  calculationOperator = '';
  prevNumber = '';
};

const toggleSign = () => {
  if (currentNumber === "-") return;
  if (currentNumber.startsWith("-")) {
    currentNumber = currentNumber.slice(1);
  } else {
    currentNumber = "-" + currentNumber;
  }
  updateScreen(currentNumber);
};

const getMemory = () => {
  const storedValue = localStorage.getItem(MEMORY_KEY);
  return storedValue !== null ? parseFloat(storedValue) : 0;
};

const setMemory = (value) => {
  localStorage.setItem(MEMORY_KEY, value.toString());
};

const memoryClear = () => setMemory(0);

const memoryRecall = () => {
  currentNumber = getMemory().toString();
  updateScreen(currentNumber);
};

const memoryAdd = () => {
  const mem = getMemory();
  setMemory(mem + parseFloat(currentNumber));
};

const memorySubtract = () => {
  const mem = getMemory();
  setMemory(mem - parseFloat(currentNumber));
};

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.textContent.trim());
    updateScreen(currentNumber);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.textContent.trim());
  });
});

equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
});

clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
});

decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.textContent);
  updateScreen(currentNumber);
});

plusMinus.addEventListener("click", toggleSign);

mcBtn.addEventListener("click", memoryClear);
mrBtn.addEventListener("click", memoryRecall);
mPlusBtn.addEventListener("click", memoryAdd);
mMinusBtn.addEventListener("click", memorySubtract);
