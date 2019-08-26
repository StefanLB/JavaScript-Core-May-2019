(function () {
    const person = document.querySelector('#person');
    const phone = document.querySelector('#phone');
    const phonebook = document.querySelector('#phonebook');

    const baseURL = 'https://rest-messanger.firebaseio.com/messanger.json';
    const li = document.createElement('li');
    const button = document.createElement('button');

    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', createContact);

    function deleteContact(id) {
        fetch(`${baseURL}/${id}.json`, {
            method: 'DELETE'
        })
            .then(() => loadContacts())
            .catch(handleError);
    }

    function loadContacts() {

        fetch(`${baseURL}.json`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                phonebook.textContent = '';
                Object.entries(data).forEach(([id, info]) => {

                    const liClone = li.cloneNode();
                    const buttonClone = button.cloneNode();

                    buttonClone.textContent = 'Delete';
                    buttonClone.addEventListener('click', () => deleteContact(id));
                    liClone.textContent = `${info.person}: ${info.phone}`;

                    liClone.appendChild(buttonClone);
                    phonebook.appendChild(liClone);
                });
            })
            .catch(handleError);
    }

    function createContact() {
        if (!person.value || !phone.value) {
            return;
        }

        fetch(`${baseURL}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person: person.value,
                phone: phone.value
            })
        })
            .then(() => loadContacts())
            .catch(handleError);

        [person.value, phone.value] = ['', ''];
    }

    function handleError(err) {
        const liClone = li.cloneNode();
        liClone.textContent = 'Error';
        phonebook.appendChild(liClone);
    }
})();
