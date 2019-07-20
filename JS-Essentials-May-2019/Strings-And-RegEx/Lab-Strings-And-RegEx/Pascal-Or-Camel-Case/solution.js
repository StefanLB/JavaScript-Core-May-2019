function solve() {
    let text = document.getElementById('text').value;
    let type = document.getElementById('naming-convention').value;
    let result = document.getElementById('result');
    let wordsList = text.toLowerCase().split(' ');

    if (type === 'Camel Case') {
        result.textContent = wordsList
            .map((word, index) => {
                return index === 0
                    ? word
                    : word.slice(0, 1).toUpperCase() + word.slice(1);
            })
            .join('');

    } else if (type === 'Pascal Case') {
        result.textContent = wordsList
            .map((word) => {
                return word.slice(0, 1).toUpperCase() + word.slice(1);
            })
            .join('');

    } else {
        result.textContent = 'Error!';
    }
}
