function f1Race(params) {
    let pilotsArr = params.shift().split(' ');

    for (let tokens of params) {
        let [action, pilot] = tokens.split(' ');
        let index = pilotsArr.indexOf(pilot);

        if (action === 'Join' && index === -1) {
            pilotsArr.push(pilot);

        } else if (action === 'Crash' && index !== -1) {
            pilotsArr.splice(index, 1);

        } else if (action === 'Pit' && index !== -1) {
            pilotsArr.splice(index, 1);
            pilotsArr.splice(Math.min(index + 1, pilotsArr.length - 1), 0, pilot);

        } else if (action === 'Overtake' && index !== -1) {
            pilotsArr.splice(index, 1);
            pilotsArr.splice(Math.max(index - 1, 0), 0, pilot);
        }
    }

    console.log(pilotsArr.join(' ~ '));
}
