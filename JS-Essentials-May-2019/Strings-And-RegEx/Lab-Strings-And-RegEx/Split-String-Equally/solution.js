function solve() {
    let text = document.querySelector('#text').value;
    let number = Number(document.querySelector('#number').value);

    let pattern = new RegExp(`.{1,${number}}`, 'g');
    let [index, result] = [0, text.match(pattern)];

    while (result[result.length - 1].length < number) {
        result[result.length - 1] += text[index++];
    }

    document.querySelector('#result').textContent = result.join(' ');
}
