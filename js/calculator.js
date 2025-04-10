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
                console.log(result);    
                break;
            default:
                return;
        }

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

    getMemory() {
        const stored = localStorage.getItem(this.memoryKey);
        return stored !== null ? parseFloat(stored) : 0;
    }

    setMemory(value) {
        localStorage.setItem(this.memoryKey, value.toString());
    }

    memoryClear() {
        this.setMemory(0);
    }

    memoryRecall() {
        this.currentNumber = this.getMemory().toString();
    }

    memoryAdd() {
        const mem = this.getMemory();
        this.setMemory(mem + parseFloat(this.currentNumber));
    }

    memorySubtract() {
        const mem = this.getMemory();
        this.setMemory(mem - parseFloat(this.currentNumber));
    }
}

export class ScientificCalculator extends Calculator {
    constructor() {
        super();
    }

    reciprocal() {
        let num = parseFloat(this.currentNumber);
        if(num === 0){
            console.error("Cannot divide by zero");
            this.currentNumber = "Cannot divide by zero";

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
        if(num === 0){
            console.error("Invalid input");
            this.currentNumber = "Invalid input";

            setTimeout(() => {
                this.clear();
            }, 3000);
            return; 
        }
        this.currentNumber = Math.log10(parseFloat(this.currentNumber)).toString();
    }
}
