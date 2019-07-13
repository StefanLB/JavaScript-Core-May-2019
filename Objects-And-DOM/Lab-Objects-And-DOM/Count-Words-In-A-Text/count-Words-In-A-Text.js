function countWordsInAText(inputString) {
    const pattern = /\w+/g;
    const words = {};

    const validWord = pattern.exec(inputString);
    while (validWord !== null) {

        if (!words[validWord[0]]) {
            words[validWord[0]] = 0;
        }

        words[validWord[0]]++;
        validWord = pattern.exec(inputString);
    }

    const outputJson = JSON.stringify(words);
    console.log(outputJson);
}
