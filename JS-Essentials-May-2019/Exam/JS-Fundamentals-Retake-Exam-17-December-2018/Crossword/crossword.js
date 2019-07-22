function crossword(inputMat) {
    let commandsObj = {
        'filter': function (secondCommand, number, word) {

            if (secondCommand === 'UPPERCASE') {
                return word.match(/[A-Z]/g)[number - 1];

            } else if (secondCommand === 'LOWERCASE') {
                return word.match(/[a-z]/g)[number - 1];

            } else if (secondCommand === 'NUMS') {
                return word.match(/[0-9]/g)[number - 1];
            }
        },
        'sort': function (secondCommand, number, word) {

            if (secondCommand === 'A') {
                return word.split('').sort((a, b) => a.localeCompare(b))[number - 1];

            } else if (secondCommand === 'Z') {
                return word.split('').sort((a, b) => b.localeCompare(a))[number - 1];
            }
        },
        'rotate': function (secondCommand, number, word) {
            let array = word.split('');

            for (let i = 0; i < secondCommand % word.length; i++) {
                array.unshift(array.pop());
            }

            return array[number - 1];
        },
        'get': function (number, word) {
            return word.split('')[number - 1];
        }
    };

    let charsArr = inputMat.reduce((accArr, inputArr) => {

        if (inputArr.length === 3) {
            let [command, number, word] = inputArr;
            accArr.push(commandsObj[command](number, word));

        } else if (inputArr.length === 4) {
            let [command, secondCommand, number, word] = inputArr;
            accArr.push(commandsObj[command](secondCommand, number, word));
        }

        return accArr;
    }, []);

    console.log(charsArr.join(''));
}
