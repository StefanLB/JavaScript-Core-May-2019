class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toString() {
        return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
    }
}

function extendPrototype(Input) {
    Input.prototype.species = 'Human';
    Input.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`;
    };

    return Input;
}
