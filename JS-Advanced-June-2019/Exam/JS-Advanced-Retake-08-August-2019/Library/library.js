class Library {
    constructor(libraryName) {
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes = {
            normal: libraryName.length,
            special: libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER
        };
    }

    subscribe(name, type) {
        if (!this.subscriptionTypes.hasOwnProperty(type)) {
            throw new Error(`The type ${type} is invalid`);
        }

        let person = this.subscribers.find((s) => s.name === name);

        if (!person) {
            person = { name, type, books: [] };
            this.subscribers.push(person);
        } else {
            person.type = type;
        }

        return person;
    }

    unsubscribe(name) {
        const person = this.subscribers.find((s) => s.name === name);

        if (!person) {
            throw new Error(`There is no such subscriber as ${name}`);
        }

        const personIndex = this.subscribers.findIndex((s) => s.name === name);
        this.subscribers.splice(personIndex, 1);
        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor) {
        const person = this.subscribers.find((s) => s.name === subscriberName);

        if (!person) {
            throw new Error(`There is no such subscriber as ${subscriberName}`);
        }

        const typeLimit = this.subscriptionTypes[person.type];

        if (typeLimit === person.books.length) {
            throw new Error(`You have reached your subscription limit ${typeLimit}!`);
        }

        const book = { title: bookTitle, author: bookAuthor };
        person.books.push(book);
        return person;
    }

    showInfo() {
        if (this.subscribers.length === 0) {
            return `${this.libraryName} has no information about any subscribers`;
        }

        const output = [];

        this.subscribers.forEach((s) => {
            output.push(`Subscriber: ${s.name}, Type: ${s.type}`);
            const books = [];

            Object.entries(s.books).forEach(([_, book]) => {
                books.push(`${book.title} by ${book.author}`);
            });

            output.push(`Received books: ${books.join(', ')}`);
        });

        return output.join('\n') + '\n';
    }
}
