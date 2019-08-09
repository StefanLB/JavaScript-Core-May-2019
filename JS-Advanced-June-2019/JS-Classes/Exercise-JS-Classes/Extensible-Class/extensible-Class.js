const Extensible = (function () {
    let counter = 0;

    return class {
        constructor() {
            this.id = counter++;
        }

        extend(template) {
            for (const key in template) {

                if (typeof template[key] !== 'function') {
                    this[key] = template[key];

                } else if (typeof template[key] === 'function') {
                    Object.getPrototypeOf(this)[key] = template[key];
                }
            }
        }
    }
})();
