function extensibleObject() {

    return {
        extend: function (template) {

            for (const property in template) {
                const [key, value] = [property, template[property]];

                if (typeof value === 'function') {
                    Object.getPrototypeOf(this)[key] = value;

                } else if (!this.hasOwnProperty(key)) {
                    this[key] = value;
                }
            }
        }
    };
}
