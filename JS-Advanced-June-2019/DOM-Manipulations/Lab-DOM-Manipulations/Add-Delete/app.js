function addItem() {
    const input = document.getElementById('newText');
    const ul = document.getElementById('items');
    ul.addEventListener('click', deleteItem);

    if (input.value === '') {
        return;
    }

    const span = document.createElement('span');
    span.textContent = input.value;

    const a = document.createElement('a');
    a.href = '#';
    a.textContent = '[Delete]';

    const li = document.createElement('li');
    li.appendChild(span);
    li.appendChild(a);

    ul.appendChild(li);
    input.value = '';

    function deleteItem(event) {
        this.removeChild(event.target.parentNode);
    }
}
