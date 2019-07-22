function travelInvestigation(paramsArr) {
    let companiesStr = paramsArr.shift();
    let delimiter = paramsArr.shift();
    let companiesArr = companiesStr.split(delimiter).map((x) => x.trim());
    let [validSentences, invalidSentences] = [[], []];

    for (let sentance of paramsArr) {
        let toLower = sentance.toLowerCase();
        let isValid = true;

        for (let company of companiesArr) {

            let index = toLower.indexOf(company);
            if (index === -1) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            validSentences.push(toLower);

        } else if (!isValid) {
            invalidSentences.push(toLower);
        }
    }

    if (validSentences.length > 0) {
        console.log('ValidSentences');
        validSentences.forEach((sentance, index) => {
            console.log(`${index + 1}. ${sentance}`);
        });
    }

    if (validSentences.length > 0 && invalidSentences.length > 0) {
        console.log('='.repeat(30));
    }

    if (invalidSentences.length > 0) {
        console.log('InvalidSentences');
        invalidSentences.forEach((sentance, index) => {
            console.log(`${index + 1}. ${sentance}`);
        });
    }
}
