function solve() {
    let text = document.getElementById('text').value;
    let result = document.getElementById('result');
    result.textContent = '';

    let digitsList = text.match(/\d+/g)
        .map((x) => String.fromCharCode(x)).join('');

    let wordsList = text.split(' ').filter((x) => isNaN(x))
        .map((x) => x.split('').map((x) => x.charCodeAt(0)).join(' '));

    wordsList.forEach((element) => {
        let numbersP = document.createElement('p');
        numbersP.textContent = element;
        result.appendChild(numbersP);
    });

    let wordP = document.createElement('p');
    wordP.textContent = digitsList;
    result.appendChild(wordP);
}
