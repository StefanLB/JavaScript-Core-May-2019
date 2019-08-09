class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    static distance(p1, p2) {
        let x = p2.x - p1.x;
        let y = p2.y - p1.y;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
}
