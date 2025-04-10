export class Convertor {
    constructor() {
        this.currentValue = '0';
        this.calculatedValue = ['0', '0', '0'];

        this.weightFactors = {
            kg: 1,
            g: 0.001,
            mg: 0.000001,
            lb: 0.453592,
            oz: 0.0283495,
        };

        this.lengthFactors = {
            m: 1,
            cm: 0.01,
            mm: 0.001,
            in: 0.0254,
            ft: 0.3048,
        };

        this.volumeFactors = {
            L: 1,
            mL: 0.001,
            m3: 1000,
            gal: 3.78541,
            pt: 0.473176,
        };
    }

    convertVolume(from, to) {
        const inLiters = this.currentValue * this.volumeFactors[from];
        this.calculatedValue[0] = inLiters / this.volumeFactors[to];
        return this.calculatedValue[0];
    }

    convertLength(from, to) {
        const inMeters = this.currentValue * this.lengthFactors[from];
        this.calculatedValue[1] = inMeters / this.lengthFactors[to];
        return this.calculatedValue[1];
    }

    convertWeight(from, to) {
        const inKg = this.currentValue * this.weightFactors[from];
        this.calculatedValue[2] = inKg / this.weightFactors[to];
        return this.calculatedValue[2];
    }

    setCurrentValue = (text) => {
        if (this.currentValue == '0') {
            if (text == '.') {
                this.currentValue += text.trim();
            } else {
                this.currentValue = text.trim();
            }
        } else {
            this.currentValue += text.trim();
        }
    };
}
