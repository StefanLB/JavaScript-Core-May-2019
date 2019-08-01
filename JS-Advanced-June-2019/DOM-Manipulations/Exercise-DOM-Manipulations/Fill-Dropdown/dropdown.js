function addItem() {
    const addText = document.querySelector('#newItemText');
    const addValue = document.querySelector('#newItemValue');

    const option = document.createElement('option');
    [option.textContent, option.value] = [addText.value, addValue.value];

    document.querySelector('#menu').appendChild(option);
    [addText.value, addValue.value] = ['', ''];
}
