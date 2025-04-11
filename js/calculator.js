export class Calculator {
    constructor() {
        this.prevNumber = '';
        this.currentNumber = '0';
        this.operator = '';
        this.memoryKey = 'calculatorMemory';
        this.lastOperation = '';
        this.justCalculated = false;

        this.tempOperator = '';
        this.tempNumber = '0';

        this.historyKey = 'calcHistory';
        this.history = [];
        this.loadHistory();
    }

    get display() {
        const num = parseFloat(this.currentNumber);
        if (isNaN(num)) return this.currentNumber;
        // return Number.isInteger(num) ? num.toString() : num.toFixed(1);

        return this.currentNumber;
    }

    inputNumber(number) {
        if (this.justCalculated) {
            this.justCalculated = false;
            this.clear();
        }

        if (this.tempOperator !== '') {
            this.currentNumber = '0';
            this.tempOperator = '';
        }

        if (this.currentNumber === '0' || this.currentNumber === '-') {
            this.currentNumber = (this.currentNumber === '-' ? '-' : '') + number;
        } else {
            this.currentNumber += number;
        }
    }

    inputDecimal() {
        if (this.justCalculated) {
            this.justCalculated = false;
            this.clear();
        }

        if (this.tempOperator !== '') {
            this.currentNumber = '0';
            this.tempOperator = '';
        }

        if (!this.currentNumber.includes('.')) {
            this.currentNumber += '.';
        }
    }

    clear() {
        this.currentNumber = '0';
        this.reset();
    }

    reset() {
        this.prevNumber = '';
        this.operator = '';
        this.lastOperation = '';
        this.tempNumber = '0';
        this.tempOperator = '';
    }

    toggleSign() {
        if (this.currentNumber === '-') return;
        if (this.currentNumber.startsWith('-')) {
            this.currentNumber = this.currentNumber.slice(1);
        } else {
            this.currentNumber = '-' + this.currentNumber;
        }
    }

    loadHistory() {
        const stored = localStorage.getItem(this.historyKey);
        if (stored) {
            this.history = JSON.parse(stored);
        }
    }

    saveHistory() {
        localStorage.setItem(this.historyKey, JSON.stringify(this.history));
    }

    addHistory(operation, result) {
        const entry = { operation, result };
        this.history.push(entry);
        this.saveHistory();
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    copyHistory() {
        const historyText = this.history
            .map(entry => `${entry.operation} ${entry.result}`)
            .join('\n');
        navigator.clipboard.writeText(historyText)
            .catch(err => console.error("Error copying history: ", err));
    }

    getHistoryDisplay() {
        if (this.history.length === 0) {
            return '<p class="history__empty fz-medium-1">history is empty</p>';
        }
        return this.history
            .map(entry => `
                <li class="history__item">
                    <p class="history__value fz-small-3">${entry.operation}</p>
                    <p class="history__result fz-medium-1">${entry.result}</p>
                </li>
            `)
            .join('');
    }

    setOperator(operator) {
        if (operator === '+/-') {
            this.toggleSign();
            return;
        }

        if (this.justCalculated) {
            this.justCalculated = false;
            this.reset();
        }

        if (operator === '-' && (this.currentNumber === '0' || this.currentNumber === '')) {
            this.currentNumber = '-';
            return;
        }

        if (this.prevNumber !== '' && this.currentNumber !== '' && this.currentNumber !== '-') {
            this.calculate();
        }

        this.operator = operator === '÷' ? '/' : operator;
        this.tempOperator = this.operator;
        this.prevNumber = this.currentNumber;

        this.tempNumber = this.currentNumber;

        this.lastOperation += `${this.currentNumber} ${operator}`;
    }

    calculate() {
        const num1 = parseFloat(this.justCalculated ? this.currentNumber : this.prevNumber);
        const num2 = parseFloat(this.justCalculated ? this.prevNumber : this.currentNumber);
        
        this.lastOperation = `${num1} ${this.operator} ${num2} =`;

        let result;
        switch (this.operator) {
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
            case 'y':
            case 'xy':
                result = Math.pow(num1, num2);
                break;
            default:
                return;
        }

        this.addHistory(this.lastOperation, result.toString());
        this.prevNumber = num2;
        this.currentNumber = result.toString();

        this.justCalculated = true;
    }

    add(value) {
        this.currentNumber = (parseFloat(this.currentNumber) + value).toString();
    }

    subtract(value) {
        this.currentNumber = (parseFloat(this.currentNumber) - value).toString();
    }

    multiply(value) {
        this.currentNumber = (parseFloat(this.currentNumber) * value).toString();
    }

    divide(value) {
        this.currentNumber = (parseFloat(this.currentNumber) / value).toString();
    }

    percent(value) {
        this.currentNumber = (parseFloat(this.currentNumber) * (value / 100)).toString();
    }

    // --- Memory Methods ---

    containsLetters(str) {
        return /[a-fA-F]/.test(str);
    }

    containsOnlyBinaryDigits(str) {
        return /^[01]+$/.test(str);
    }

    getMemory() {
        const stored = localStorage.getItem(this.memoryKey);
        if (stored === null) return 0;

        if (this.containsLetters(stored)) {
            return stored;
        } else if (this.containsOnlyBinaryDigits(stored)) {
            return stored;
        } else {
            return parseFloat(stored);
        }
    }

    setMemory(value) {
        localStorage.setItem(this.memoryKey, value.toString());
    }

    memoryClear() {
        this.setMemory(0);
    }

    memoryRecall() {
        let mem = this.getMemory();

        if (this.containsLetters(mem)) {
            this.currentNumber = mem;
        } else {
            this.currentNumber = mem.toString();
        }
    }

    memoryAdd() {
        let mem = this.getMemory();

        if (this.containsLetters(this.currentNumber)) {
            const memValue = parseInt(mem, 16);
            const currentValue = parseInt(this.currentNumber, 16);
            const newMemory = memValue + currentValue;

            this.setMemory(newMemory.toString(16));
        }
        else if (this.containsOnlyBinaryDigits(this.currentNumber)) {
            const memValue = parseInt(mem, 2);
            const currentValue = parseInt(this.currentNumber, 2);
            const newMemory = memValue + currentValue;

            this.setMemory(newMemory.toString(2));
        }
        else {
            this.setMemory(parseFloat(mem) + parseFloat(this.currentNumber));
        }
    }

    memorySubtract() {
        let mem = this.getMemory();

        if (this.containsLetters(mem)) {
            const memValue = parseInt(mem, 16);
            const currentValue = parseInt(this.currentNumber, 16);
            const newMemory = memValue - currentValue;
            this.setMemory(newMemory.toString(16));
        }
        else if (this.containsOnlyBinaryDigits(this.currentNumber)) {
            const memValue = parseInt(mem, 2);
            const currentValue = parseInt(this.currentNumber, 2);
            const newMemory = memValue - currentValue;
            this.setMemory(newMemory.toString(2));
        }
        else {
            this.setMemory(parseFloat(mem) - parseFloat(this.currentNumber));
        }
    }

}

export class ScientificCalculator extends Calculator {
    constructor() {
        super();
    }

    reciprocal() {
        let num = parseFloat(this.currentNumber);
        if (num === 0) {
            console.error('Cannot divide by zero');
            this.currentNumber = 'Cannot divide by zero';

            setTimeout(() => {
                this.clear();
            }, 3000);
            return;
        }
        this.currentNumber = (1 / num).toString();
    }

    factorial() {
        let num = parseFloat(this.currentNumber);
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        this.currentNumber = result.toString();
    }

    squareRoot() {
        this.currentNumber = Math.sqrt(parseFloat(this.currentNumber)).toString();
    }

    logarithm() {
        let num = parseFloat(this.currentNumber);
        if (num === 0) {
            console.error('Invalid input');
            this.currentNumber = 'Invalid input';

            setTimeout(() => {
                this.clear();
            }, 3000);
            return;
        }
        this.currentNumber = Math.log10(parseFloat(this.currentNumber)).toString();
    }
}

export class BinaryCalculator extends Calculator {
    constructor() {
        super();
        this.isBinaryMode = true;
        this.currentNumber = '';
    }
    binaryToDecimal(binaryStr) {
        return parseInt(binaryStr, 2);
    }

    decimalToBinary(decimalNumber) {
        return decimalNumber.toString(2);
    }

    clear() {
        this.currentNumber = '';
        this.reset();
    }

    inputNumber(number) {
        if (number !== '0' && number !== '1') return;

        if (this.justCalculated) {
            this.justCalculated = false;
            this.clear();
        }

        if (this.tempOperator !== '') {
            this.currentNumber = '';
            this.tempOperator = '';
        }

        this.currentNumber += number;
    }

    calculate() {
        const num1 = this.binaryToDecimal(this.prevNumber);
        const num2 = this.binaryToDecimal(this.currentNumber);

        this.lastOperation = `${this.prevNumber} ${this.operator} ${this.currentNumber} =`;

        let result;
        switch (this.operator) {
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
            case 'y':
            case 'xy':
                result = Math.pow(num1, num2);
                break;
            default:
                return;
        }
        this.prevNumber = this.currentNumber;
        this.currentNumber = this.decimalToBinary(result);
        this.justCalculated = true;
    }
}

export class HexadecimalCalculator extends ScientificCalculator {
    constructor() {
        super();
        this.isHexadecimalMode = true;
        this.currentNumber = '';
    }

    hexToDecimal(hexStr) {
        return parseInt(hexStr, 16);
    }

    decimalToHex(decimalNumber) {
        return decimalNumber.toString(16);
    }

    clear() {
        this.currentNumber = '';
        this.reset();
    }

    calculate() {
        const num1 = this.hexToDecimal(this.prevNumber);
        const num2 = this.hexToDecimal(this.currentNumber);

        this.lastOperation = `${this.prevNumber} ${this.operator} ${this.currentNumber} =`;

        let result;
        switch (this.operator) {
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
            case 'y':
            case 'xy':
                result = Math.pow(num1, num2);
                break;
            default:
                return;
        }
        this.prevNumber = this.currentNumber;
        this.currentNumber = this.decimalToHex(result);
        this.justCalculated = true;
    }
}

