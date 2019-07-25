function solve() {
    const teamsObj = {
        'Levski': { 'A': [], 'B': [], 'C': [] },
        'VIP': { 'A': [], 'B': [], 'C': [] },
        'Litex': { 'A': [], 'B': [], 'C': [] }
    }

    const priceObj = {
        'Levski': { 'A': 10, 'B': 7, 'C': 5 },
        'VIP': { 'A': 25, 'B': 15, 'C': 10 },
        'Litex': { 'A': 10, 'B': 7, 'C': 5 }
    }

    let [income, fans] = [0, 0];

    const output = document.getElementById('output');
    const summary = document.querySelector('#summary');

    summary.querySelector('button').addEventListener('click', function () {
        summary.querySelector('span').textContent = `${income} leva, ${fans} fans.`;
    });

    Array.from(document.querySelectorAll('button')).slice(0, -1).forEach((button) => {
        button.addEventListener('click', process);
    });

    function process() {
        this.style.backgroundColor = 'rgb(255, 0, 0)';
        const cellIndex = this.parentNode.cellIndex;
        const seatNumber = this.textContent;
        const team = this.parentNode.parentNode.parentNode.parentNode.parentNode.className;
        let sector;

        if (cellIndex === 0) {
            sector = 'A';
        } else if (cellIndex === 1) {
            sector = 'B';
        } else if (cellIndex === 2) {
            sector = 'C';
        }

        if (!teamsObj[team][sector].includes(seatNumber)) {
            fans++;
            income += priceObj[team][sector];
            teamsObj[team][sector].push(seatNumber);

            output.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} was taken.\n`;
        } else {
            output.value += ` Seat ${seatNumber} in zone ${team} sector ${sector} is unavailable.\n`;
        }
    }
}
