class HolbertonClass {
    constructor(size, location) {
        this.size = size;
        this.location = location;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        if (typeof value !== "number") {
            throw new TypeError("Size must be a number");
        }
        this._size = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        if (typeof value !== "string") {
            throw new TypeError("Location must be a string");
        }
        this._location = value;
    }
    toString() {
        return this.location;
    }
    valueOf() {
        return this.size;
    }
}
const hc = new HolbertonClass(12, "Mezzanine")
// console.log(Number(hc));
// console.log(String(hc));
export default HolbertonClass;