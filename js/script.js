import { Calculator } from './calculator.js';

const calculator = new Calculator();

const calculatorScreen = document.querySelector('.display__result.fz-big-1');
const lastOperation = document.querySelector('#last-operation');
const numbers = document.querySelectorAll('[id^="number-"]');
const operators = document.querySelectorAll('.fz-medium-1.control');
const equalSign = document.getElementById('calculate');
const clearBtn = document.getElementById('clear');
const decimal = document.getElementById('decimal');
const plusMinus = document.getElementById('toggle-sing');
const mcBtn = document.getElementById('mc-btn');
const mrBtn = document.getElementById('mr-btn');
const mPlusBtn = document.getElementById('m_plus-btn');
const mMinusBtn = document.getElementById('m_minus-btn');

const updateScreen = () => {
    calculatorScreen.textContent = calculator.display;
    lastOperation.textContent = calculator.lastOperation;
};

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        calculator.inputNumber(event.target.textContent.trim());
        updateScreen();
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        calculator.setOperator(event.target.textContent.trim());
        updateScreen();
    });
});

equalSign.addEventListener('click', () => {
    calculator.calculate();
    updateScreen();
});

clearBtn.addEventListener('click', () => {
    calculator.clear();
    updateScreen();
});

decimal.addEventListener('click', (event) => {
    calculator.inputDecimal();
    updateScreen();
});

mcBtn.addEventListener('click', () => {
    calculator.memoryClear();
});

mrBtn.addEventListener('click', () => {
    calculator.memoryRecall();
    updateScreen();
});

mPlusBtn.addEventListener('click', () => {
    calculator.memoryAdd();
});

mMinusBtn.addEventListener('click', () => {
    calculator.memorySubtract();
});

window.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        calculator.inputNumber(key);
        updateScreen();
    }

    if (key === '.') {
        calculator.inputDecimal();
        updateScreen();
    }

    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        calculator.setOperator(key);
        updateScreen();
    }

    if (key === 'Enter' || key === '=') {
        calculator.calculate();
        updateScreen();
    }

    if (key === 'Backspace') {
        calculator.toggleSign();
        updateScreen();
    }

    if (key === 'Escape') {
        calculator.clear();
        updateScreen();
    }
});
