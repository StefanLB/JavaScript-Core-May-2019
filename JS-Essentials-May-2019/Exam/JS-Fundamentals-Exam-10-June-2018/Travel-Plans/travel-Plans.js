function travelPlans(paramsArr) {

    let specialized = function (professions) {
        return ['Programming', 'Hardware maintenance', 'Cooking',
            'Translating', 'Designing'].indexOf(professions);
    }

    let average = function (professions) {
        return ['Driving', 'Managing', 'Fishing', 'Gardening'].indexOf(professions);
    }

    let clumsy = function (professions) {
        return ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting',
            'Writing', 'Lecturing', 'Modeling', 'Nursing'].indexOf(professions);
    }

    let [sum, specializedCounter, clumsyCounter] = [0, 0, 0];

    paramsArr.forEach((tokens) => {
        let [professions, money] = tokens.split(':').filter((x) => x).map((x) => x.trim());
        let currentCash = +money;

        if (specialized(professions) !== -1 && currentCash >= 200) {
            specializedCounter++;
            sum += currentCash * 0.80;
            sum += specializedCounter % 2 === 0 ? 200 : 0;

        } else if (average(professions) !== -1) {
            sum += currentCash;

        } else if (clumsy(professions) !== -1) {
            clumsyCounter++;

            if (clumsyCounter % 2 === 0) {
                sum += currentCash - (currentCash * 0.05);
            } else if (clumsyCounter % 3 === 0) {
                sum += currentCash - (currentCash * 0.1);
            } else if (clumsyCounter % 1 === 0) {
                sum += currentCash;
            }
        }
    });

    let difference = Math.abs(sum - 1000).toFixed(2);
    console.log(sum >= 1000
        ? `Final sum: ${sum.toFixed(2)}\nMariyka earned ${difference} gold more.`
        : `Final sum: ${sum.toFixed(2)}\nMariyka need to earn ${difference} gold more to continue in the next task.`);
}
