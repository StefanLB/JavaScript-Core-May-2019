function surveyParser(input) {
    let surveyReg = /<svg>((.|\n)*?)<\/svg>/g;
    let catReg = /<cat><text>((.|\n)*?)\[((.|\n)*?)]((.|\n)*?)<\/text><\/cat>\s*<cat>((.|\n)*?)<\/cat>/g;
    let ratingsReg = /<g><val>([0-9]+)<\/val>([0-9]+)<\/g>/g;

    if (!surveyReg.test(input)) {
        console.log('No survey found');
    } else if (!catReg.test(input)) {
        console.log('Invalid format');
    } else {
        catReg = /<cat><text>((.|\n)*)\[((.|\n)*)]((.|\n)*)<\/text><\/cat>\s*<cat>((.|\n)*)<\/cat>/g;
        let label = catReg.exec(input)[3];
        let [ratingsSum, ratingsCount] = [0, 0];

        let ratings = ratingsReg.exec(input);
        while (ratings !== null) {
            let [value, count] = ratings.slice(1).map((x) => +x);

            if (value >= 1 && value <= 10) {
                ratingsSum += value * count;
                ratingsCount += count;
            }

            ratings = ratingsReg.exec(input);
        }

        let average = +(ratingsSum / ratingsCount).toFixed(2);
        console.log(`${label}: ${average}`);
    }
}
