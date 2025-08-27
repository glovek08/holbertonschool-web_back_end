// Implement a class named Car:

//     Constructor attributes:
//         brand (String)
//         motor (String)
//         color (String)
//     Each attribute must be stored in an “underscore” attribute version (ex: name is stored in _name)
//     Add a method named cloneCar. This method should return a new object of the class.

// Hint: Symbols in ES6
class Car {
    constructor(brand, motor, color) {
        this.brand = brand;
        this.motor = motor;
        this.color = color;
    }
    get brand() {
        return this._brand;
    }
    set brand(value) {
        if (typeof value !== "string") {
            throw new TypeError("Brand must be a string");
        }
        this._brand = value;
    }
    get motor() {
        return this._motor;
    }
    set motor(value) {
        if (typeof value !== "string") {
            throw new TypeError("Motor must be a string")
        }
        this._motor = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        if (typeof value !== "string") {
            throw new TypeError("Color must be a string");
        }
        this._color = value;
    }
    cloneCar() {
        return new Car(this.brand, this.color, this.motor);
    }
}