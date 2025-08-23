import Currency from './3-currency.js';

class Pricing {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  set amount(value) {
    if (typeof value !== 'number') {
      throw new TypeError('Amount must be a number');
    }
    this._amount = value;
  }

  set currency(value) {
    if (!(value instanceof Currency)) {
      throw new TypeError('Value must be an instance of Currency');
    }
    this._currency = value;
  }

  displayFullPrice() {
    return `${this.amount} ${this.currency.displayFullCurrency()}`;
  }

  convertPrice(amount, conversionRate) {
    if (typeof amount !== 'number') {
      throw new TypeError('Amount must be a number');
    }
    if (typeof conversionRate !== 'number') {
      throw new TypeError('Conversion rate must be a number');
    }
    return amount * conversionRate;
  }
}

export default Pricing;

// const pri1 = new Pricing(69, new Currency("€", "Euro"));

// console.log("TEST: " + pri1.displayFullPrice());
