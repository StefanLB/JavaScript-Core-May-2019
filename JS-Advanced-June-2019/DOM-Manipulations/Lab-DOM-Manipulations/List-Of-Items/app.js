function addItem() {
    const input = document.getElementById('newItemText');
    const li = document.createElement('li');
    const text = document.createTextNode(input.value);
    li.appendChild(text);
    document.getElementById('items').appendChild(li);
    input.value = '';
}
