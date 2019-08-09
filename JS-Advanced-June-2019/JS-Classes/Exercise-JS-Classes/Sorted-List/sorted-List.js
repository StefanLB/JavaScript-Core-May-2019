class List {
    constructor() {
        this.elements = [];
        this.size = 0;
    }

    add(element) {
        this.elements.push(element);
        this.elements.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        if (index >= 0 && index <= this.elements.length - 1) {
            this.elements.splice(index, 1);
            this.size--;
        }
    }

    get(index) {
        if (index >= 0 && index <= this.elements.length - 1) {
            return this.elements[index];
        }
    }
}
