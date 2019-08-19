class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = Number(budget);
        this.kids = {};
        this.numberOfChildren = 0;
    }

    registerChild(name, grade, budget) {

        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }

        let nameCheck = this.kids[grade].find((info) => info.indexOf(name) > -1);

        if (nameCheck) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }

        this.numberOfChildren += 1;
        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {

        if (!this.kids[grade]) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        let nameCheck = this.kids[grade].find((info) => info.indexOf(name) > -1);

        if (!nameCheck) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        this.numberOfChildren -= 1;
        let nameIndex = this.kids[grade].findIndex((info) => info.indexOf(name) > -1);
        this.kids[grade].splice(nameIndex, 1);
        return this.kids[grade];
    }

    toString() {

        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let res = [`${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}`];

        Object.entries(this.kids).forEach(([grade, info]) => {
            res.push(`Grade: ${grade}`);

            info.forEach((name, index) => {
                res.push(`${index + 1}. ${name}`);
            });

            res.push('');
        });

        return res.join('\n');
    }
}
