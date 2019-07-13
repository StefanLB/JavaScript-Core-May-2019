function solve() {
    let select = document.querySelector('select[id="selectMenuTo"]');

    let binaryOption = document.createElement('option');
    let hexadecimalOption = document.createElement('option');

    binaryOption.value = 'binary';
    hexadecimalOption.value = 'hexadecimal';

    binaryOption.textContent = 'Binary';
    hexadecimalOption.textContent = 'Hexadecimal';

    select.appendChild(binaryOption);
    select.appendChild(hexadecimalOption);

    document.querySelector('button').addEventListener('click', function () {
        let number = document.querySelector('input[id="input"]');
        let result = document.getElementsByName('output')[0];

        if (select.value === 'binary') {
            result.value = (+number.value).toString(2);

        } else if (select.value === 'hexadecimal') {
            result.value = ((+number.value).toString(16)).toUpperCase();
        }
    });
}
