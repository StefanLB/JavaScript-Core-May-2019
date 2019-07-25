function solve() {
    const commands = {
        'filter': function (secondCommand, number, word) {

            if (secondCommand === 'uppercase') {
                return word.match(/[A-Z]/g)[number - 1];

            } else if (secondCommand === 'lowercase') {
                return word.match(/[a-z]/g)[number - 1];

            } else if (secondCommand === 'nums') {
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

    const word = document.getElementById('input');
    let output = document.querySelector('#output p');

    [...document.getElementsByTagName('button')].forEach((button) => {
        button.addEventListener('click', function () {
            const command = this.textContent.toLowerCase();

            if (command === 'filter') {
                const marked = document.getElementById('filterSecondaryCmd')
                const secondCommand = marked.options[marked.selectedIndex];
                const position = document.getElementById('filterPosition');

                const result = commands[command](secondCommand.value, Number(position.value), word.value);
                [word.value, marked.selectedIndex, position.value] = ['', 0, ''];
                output.textContent += result;

            } else if (command === 'sort') {
                const marked = document.getElementById('sortSecondaryCmd')
                const secondCommand = marked.options[marked.selectedIndex];
                const position = document.getElementById('sortPosition');

                const result = commands[command](secondCommand.value, Number(position.value), word.value);
                [word.value, marked.selectedIndex, position.value] = ['', 0, ''];
                output.textContent += result;

            } else if (command === 'rotate') {
                const secondCommand = document.getElementById('rotateSecondaryCmd');
                const position = document.getElementById('rotatePosition');

                const result = commands[command](secondCommand.value, Number(position.value), word.value);
                [word.value, secondCommand.value, position.value] = ['', '', ''];
                output.textContent += result;

            } else if (command === 'get') {
                const position = document.getElementById('getPosition');

                const result = commands[command](Number(position.value), word.value);
                [word.value, position.value] = ['', ''];
                output.textContent += result;
            }
        });
    });
}
