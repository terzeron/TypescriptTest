class BasicCalculator {
    public constructor(protected value: number = 0) {

    }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}

let v = new BasicCalculator(2)
.multiply(5)
.add(1)
.currentValue();
console.log(v);