import { ScientificCalculator, BinaryCalculator, Calculator, HexadecimalCalculator } from './calculator.js';

let calculator = new ScientificCalculator();

const calculatorScreen = document.querySelector('.display__result.fz-big-1');
const lastOperation = document.querySelector('#last-operation');
const numbers = document.querySelectorAll('[id^="number-"]');
const operators = document.querySelectorAll(
    '.fz-medium-1.control, fz-medium-1.control.scientific-btn',
);
const equalSign = document.querySelectorAll('#calculate');
const clearBtn = document.querySelectorAll('#clear');
const decimalDot = document.getElementById('decimalDot');
const mcBtn = document.getElementById('mc-btn');
const mrBtn = document.getElementById('mr-btn');
const mPlusBtn = document.getElementById('m_plus-btn');
const mMinusBtn = document.getElementById('m_minus-btn');

const binaryModeBtn = document.getElementById('binary');
const scientificModeBtn = document.getElementById('scientific');
const decimalModeBtn = document.getElementById('decimal');
const hexadecimalModeBtn = document.getElementById('hexadecimal');

const copyHistoryBtn = document.getElementById('copy-history');
const clearHistoryBtn = document.getElementById('clear-history');

function updateHistoryDisplay() {
    document.querySelector('.history__list').innerHTML = calculator.getHistoryDisplay();
}

const updateScreen = () => {
    calculatorScreen.textContent = calculator.display;
    lastOperation.textContent = calculator.lastOperation;
};

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (calculator.isBinaryMode) {
            const digit = event.target.textContent.trim();
            if (digit !== '0' && digit !== '1') return;
            calculator.inputNumber(digit);
        } else {
            calculator.inputNumber(event.target.textContent.trim());
        }
        updateScreen();
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        calculator.setOperator(event.target.textContent.trim());
        //console.log(event.target.textContent.trim());
        updateScreen();
    });
});

equalSign.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.calculate();
        updateScreen();
        updateHistoryDisplay();
    });
});

clearBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.clear();
        updateScreen();
    });
});

decimalDot.addEventListener('click', (event) => {
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
    event.preventDefault();

    const key = event.key;

    switch (key) {
        case 'Enter':
        case '=':
            calculator.calculate();
            updateScreen();
            return;
        case 'Escape':
            calculator.clear();
            updateScreen();
            return;
        case 'Backspace':
            calculator.toggleSign();
            updateScreen();
            return;
        case 'Alt':
        case 'Control':
        case 'CapsLock': 
            return;
        default:
            break;
    }

    if (calculator.isHexadecimalMode) {
        if (
            (key >= '0' && key <= '9') ||
            (key.toLowerCase() >= 'a' && key.toLowerCase() <= 'f')
        ) {
            calculator.inputNumber(key);
            updateScreen();
            return;
        }
    } else if (calculator.isBinaryMode) {
        if (key === '0' || key === '1') {
            calculator.inputNumber(key);
            updateScreen();
            return;
        }
    } else { 
        if (key >= '0' && key <= '9') {
            calculator.inputNumber(key);
            updateScreen();
            return;
        }
        if (key === '.') {
            calculator.inputDecimal();
            updateScreen();
            return;
        }
        if (['+', '-', '*', '/', '%'].includes(key)) {
            calculator.setOperator(key);
            updateScreen();
            return;
        }
    }
});

const FactoialBtn = document.getElementById('factorial');
const ReciprocalBtn = document.querySelectorAll('[data-attribute="reciprocal"]');
const SquareRootBtn = document.querySelectorAll('[data-attribute="sqrt"]');
const LogarithmBtn = document.getElementById('log');

FactoialBtn.addEventListener('click', () => {
    calculator.factorial();
    updateScreen();
});

ReciprocalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.reciprocal();
        updateScreen();
    });
});

SquareRootBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.squareRoot();
        updateScreen();
    })
})

copyHistoryBtn.addEventListener('click', () => {
    calculator.copyHistory();
});

clearHistoryBtn.addEventListener('click', () => {
    calculator.clearHistory();
    document.querySelector('.history__list').innerHTML = calculator.getHistoryDisplay();
});

LogarithmBtn.addEventListener('click', () => {
    calculator.logarithm();
    updateScreen();
});

binaryModeBtn.addEventListener('click', () => {
    calculator = new BinaryCalculator();
    updateScreen();
});

scientificModeBtn.addEventListener('click', () => {
    calculator = new ScientificCalculator();
    updateScreen();
});

decimalModeBtn.addEventListener('click', () => {
    calculator = new Calculator();
    updateScreen();
});

hexadecimalModeBtn.addEventListener('click', () => {
    calculator = new HexadecimalCalculator();
    updateScreen();
});