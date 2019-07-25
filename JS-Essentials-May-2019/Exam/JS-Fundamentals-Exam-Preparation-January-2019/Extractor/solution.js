function solve() {
    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let inputStr = document.getElementById('input').value;

        let numPattern = /^[0-9]+/g;
        let number = Number(inputStr.match(numPattern));

        inputStr = inputStr.replace(number, '');
        inputStr = inputStr.substr(0, number);

        let splitChar = inputStr[inputStr.length - 1];
        inputStr = inputStr.substr(0, inputStr.length - 1);
        let arrays = inputStr.split(splitChar);

        let pattern = new RegExp(`[^${arrays[0]}]`, 'g');
        let match = arrays[1].match(pattern);
        let result = match.join('').replace(/#/g, ' ');

        document.getElementById('output').value = result;
    });
}
