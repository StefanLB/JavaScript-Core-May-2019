class Rat {
    constructor(name) {
        this.name = name;
        this.rats = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.rats.push(otherRat);
        }
    }

    getRats() {
        return this.rats;
    }

    toString() {
        return this.name + '\n' + this.rats.map((rat) => '##' + rat).join('');
    }
}
