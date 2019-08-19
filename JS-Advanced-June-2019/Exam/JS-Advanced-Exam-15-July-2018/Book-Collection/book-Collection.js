class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
    }

    get room() {
        return this._room;
    }

    set room(room) {
        if (room !== 'livingRoom' && room !== 'bedRoom' && room !== 'closet') {
            throw new Error(`Cannot have book shelf in ${room}`);
        }

        this._room = room;
    }

    addBook(bookName, bookAuthor, genre) {

        if (this.shelfCapacity === 0) {
            this.shelf.shift();
            this.shelfCapacity++;
        }

        const book = { bookName, bookAuthor, genre };
        this.shelfCapacity--;
        this.shelf.push(book);
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        const bookIndex = this.shelf.findIndex((b) => b.bookName === bookName);
        this.shelf.splice(bookIndex, 1);
        return this;
    }

    showBooks(genre) {
        const output = [`Results for search "${genre}":`];

        this.shelf.filter((b) => b.genre === genre).forEach((b) => {
            output.push(`\uD83D\uDCD6 ${b.bookAuthor} - "${b.bookName}"`);
        });

        return output.join('\n');
    }

    get shelfCondition() {
        return this.shelfCapacity;
    }

    toString() {
        if (this.shelf.length === 0) {
            return `It's an empty shelf`;
        }

        const output = [`"${this.shelfGenre}" shelf in ${this.room} contains:`];

        this.shelf.forEach((b) => {
            output.push(`\uD83D\uDCD6 "${b.bookName}" - ${b.bookAuthor}`);
        });

        return output.join('\n');
    }
}
