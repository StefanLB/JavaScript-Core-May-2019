function deleteByEmail() {
    const email = document.querySelector('input[type="text"]');
    const trList = [...document.querySelectorAll('#customers tr')].slice(1);
    const result = document.getElementById('result');

    const index = trList.findIndex((tr) => {
        return tr.lastElementChild.textContent === email.value;
    });

    if (index > -1) {
        trList[index].parentNode.removeChild(trList[index]);
        result.textContent = 'Deleted.';

    } else if (index === -1) {
        result.textContent = 'Not found.';
    }

    email.value = '';
}
