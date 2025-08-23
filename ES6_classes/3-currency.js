class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
    get code() {
        return this._code;
    }
    get name() {
        return this._name;
    }
    set code(value) {
        if (typeof value !== "string") {
            throw new TypeError("Value must be a string");
        }
        this._code = value;
    }
    set name(value) {
        if (typeof value !== "string") {
            throw new TypeError("Value must be a string");
        }
        this._name = value;
    }
    displayFullCurrency = () => {
        return `${this.name} (${this.code})`;
    }
}
export default Currency;

// const curr1 = new Currency(4, "Cacumba");
// console.log(curr1.displayFullCurrency());
