function toggle() {
    const spanButton = document.getElementsByClassName('button')[0];
    const divBox = document.getElementById('extra');

    if (spanButton.textContent === 'More') {
        spanButton.textContent = 'Less';
        divBox.style.display = 'block';

    } else if (spanButton.textContent === 'Less') {
        spanButton.textContent = 'More';
        divBox.style.display = 'none';
    }
}
