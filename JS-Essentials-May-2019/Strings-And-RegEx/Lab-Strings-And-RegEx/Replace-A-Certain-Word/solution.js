function solve() {
    let wordsList = JSON.parse(document.querySelector('#text').value);
    let word = document.querySelector('#word').value;
    let result = document.querySelector('#result');
    result.textContent = '';
    let p = document.createElement('p');

    let replaceWord = wordsList[0].split(' ')[2];
    let pattern = new RegExp(replaceWord, 'i');
    let outputList = wordsList.map((x) => x.replace(pattern, word));

    outputList.forEach((element) => {
        let pClone = p.cloneNode();
        pClone.textContent = element;
        result.appendChild(pClone);
    });
}
