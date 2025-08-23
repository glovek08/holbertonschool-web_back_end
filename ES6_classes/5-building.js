class Building {
    constructor(sqft) {
        this.sqft = sqft;
    }
    get sqft() {
        return this._sqft;
    }
    set sqft(value) {
        if (typeof value !== "number") {
            throw new TypeError("SqFt must be a number");
        }
        this._sqft = value;
    }
    evacuationWarningMessage() {
        throw new Error("Class extending Building must override evacuationWarningMessage");
    }
}
export default Building;