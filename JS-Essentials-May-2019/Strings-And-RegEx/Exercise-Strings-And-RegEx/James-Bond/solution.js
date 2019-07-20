function solve() {
    let inputList = JSON.parse(document.querySelector('#array').value);
    let result = document.querySelector('#result');
    result.textContent = '';
    let p = document.createElement('p');

    let [key, messagesList] = [inputList[0], inputList.slice(1)];
    let tempPattern = `(?:\\s|^)(?:${key}\\s+)([A-Z!#$%]{8,})(?:\\.|,|\\s|$)`;
    let keyPattern = new RegExp(tempPattern, 'gi');

    messagesList.forEach((element) => {
        let encoded = keyPattern.exec(element);

        while (encoded !== null) {
            let word = encoded[1];

            if (word.toUpperCase() === word) {
                let replacement = word.toLowerCase().replace(/!/g, 1)
                    .replace(/%/g, 2).replace(/#/g, 3).replace(/\$/g, 4);

                element = element.replace(word, replacement);
            }

            encoded = keyPattern.exec(element);
        }

        let cloneP = p.cloneNode();
        cloneP.textContent = element;
        result.appendChild(cloneP);
    });
}
