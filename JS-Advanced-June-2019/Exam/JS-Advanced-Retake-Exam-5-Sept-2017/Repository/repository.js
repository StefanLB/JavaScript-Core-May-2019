class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();
    }

    get count() {
        return this.data.size;
    }

    add(entity) {
        for (const property in this.props) {
            if (!entity[property]) {
                throw new Error(`Property ${property} is missing from the entity!`);

            } else if (typeof entity[property] !== this.props[property]) {
                throw new TypeError(`Property ${property} is of incorrect type!`);
            }
        }

        const id = this.count;
        this.data.set(id, entity);
        return id;
    }

    get(id) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        return this.data.get(id);
    }

    update(id, newEntity) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        for (const property in this.props) {
            if (!newEntity.hasOwnProperty(property)) {
                throw new Error(`Property ${property} is missing from the entity!`);

            } else if (typeof newEntity[property] !== this.props[property]) {
                throw new TypeError(`Property ${property} is of incorrect type!`);
            }
        }

        this.data.set(id, newEntity);
    }

    del(id) {
        if (!this.data.has(id)) {
            throw new Error(`Entity with id: ${id} does not exist!`);
        }

        this.data.delete(id);
    }
}
