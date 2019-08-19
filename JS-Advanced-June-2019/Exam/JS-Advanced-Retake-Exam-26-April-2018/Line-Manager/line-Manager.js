class LineManager {
    constructor(stops) {
        this.stops = stops;
        this.currentStop = 0;
        this.actualTime = 0;
        this.expectedTime = 0;
    }

    get stops() {
        return this._stops;
    }

    set stops(stops) {
        stops.forEach((stop) => {
            if (stop.name === '' || typeof stop.name !== 'string') {
                throw new Error('stop name must be a string');
            }
        });

        stops.forEach((stop) => {
            if (stop.timeToNext < 0 || typeof stop.timeToNext !== 'number') {
                throw new Error('stop timeToNext must be a number');
            }
        });

        this._stops = stops;
    }

    get atDepot() {
        return this._stops.length === this.currentStop + 1;
    }

    get nextStopName() {
        return this.atDepot ? 'At depot.' : this.stops[this.currentStop + 1].name;
    }

    get currentDelay() {
        return this.actualTime - this.expectedTime;
    }

    arriveAtStop(minutes) {
        if (minutes < 0 || typeof minutes !== 'number') {
            throw new Error('minutes cannot be negative');
        }

        if (this.atDepot === true) {
            throw new Error('last stop reached');
        }

        this.actualTime += minutes;
        this.expectedTime += this._stops[this.currentStop].timeToNext;
        this.currentStop += 1;
        return !this.atDepot;
    }

    toString() {
        const nextStop = this.nextStopName;

        const output = ['Line summary'];
        output.push(nextStop === 'At depot.' ? '- Course completed' : `- Next stop: ${nextStop}`);
        output.push(`- Stops covered: ${this.currentStop}`);
        output.push(`- Time on course: ${this.actualTime} minutes`);
        output.push(`- Delay: ${this.currentDelay} minutes`);

        return output.join('\n');
    }
}
