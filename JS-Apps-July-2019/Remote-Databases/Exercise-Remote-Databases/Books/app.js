(function () {
    const appKey = 'kid_B1Li06S-H';
    const [username, password] = ['guest', 'guest'];
    const [baseUrl, endPoint] = ['https://baas.kinvey.com/appdata', 'books'];

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    };

    document.querySelector('.addBook').addEventListener('click', addBook);
    document.querySelector('.loadBooks').addEventListener('click', loadBooks);
    document.querySelector('.editBook').addEventListener('click', postEdit);

    const td = document.createElement('td');
    const tbody = document.querySelector('tbody');
    const notification = document.querySelector('.notification');

    function addBook(event) {
        event.preventDefault();

        const fieldset = document.querySelector('.addForm').children;
        const [title, author, isbn] = Array.from(fieldset).filter((e) => e.type === 'text');

        if (!title.value || !author.value || !isbn.value) {
            return;
        }

        showNotification('Book has been added. Please reload...');

        const data = { title: title.value, author: author.value, isbn: isbn.value };

        fetch(`${baseUrl}/${appKey}/${endPoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        }).then((data) => {
            [title.value, author.value, isbn.value] = ['', '', ''];
        }).catch((err) => {
            console.log(err);
        });
    }

    function loadBooks() {
        showNotification('Loading books...');

        fetch(`${baseUrl}/${appKey}/${endPoint}`, {
            method: 'GET',
            headers
        })
            .then((res) => res.json())
            .then((data) => {
                tbody.textContent = '';

                data.forEach((book) => {
                    const tr = document.createElement('tr');

                    const tdTitle = td.cloneNode();
                    tdTitle.textContent = book.title;
                    tr.appendChild(tdTitle);

                    const tdAuthor = td.cloneNode();
                    tdAuthor.textContent = book.author;
                    tr.appendChild(tdAuthor);

                    const tdIsbn = td.cloneNode();
                    tdIsbn.textContent = book.isbn;
                    tr.appendChild(tdIsbn);

                    const tdButtons = td.cloneNode();

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => getEdit(book._id));
                    tdButtons.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => deleteBook(book._id));
                    tdButtons.appendChild(deleteButton);

                    tr.appendChild(tdButtons);
                    tbody.appendChild(tr);
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    function getEdit(id) {
        fetch(`${baseUrl}/${appKey}/${endPoint}/${id}`, {
            method: 'GET',
            headers
        })
            .then((res) => res.json())
            .then((book) => {
                document.querySelector('.editForm .title').value = book.title;
                document.querySelector('.editForm .author').value = book.author;
                document.querySelector('.editForm .isbn').value = book.isbn;
                document.querySelector('.editForm').id = book._id;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function postEdit(event) {
        event.preventDefault();
        const title = document.querySelector('.editForm .title');
        const author = document.querySelector('.editForm .author');
        const isbn = document.querySelector('.editForm .isbn');
        const id = document.querySelector('.editForm').id;

        if (!title.value || !author.value || !isbn.value) {
            return;
        }

        showNotification('Book has been edited. Please reload...');

        const data = { title: title.value, author: author.value, isbn: isbn.value };

        fetch(`${baseUrl}/${appKey}/${endPoint}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        }).then((data) => {
            [title.value, author.value, isbn.value] = ['', '', ''];
        }).catch((err) => {
            console.log(err);
        });
    }

    function deleteBook(id) {
        showNotification('Book has been deleted. Please reload...');

        fetch(`${baseUrl}/${appKey}/${endPoint}/${id}`, {
            method: 'DELETE',
            headers
        })
            .then((data) => {

            })
            .catch((err) => {
                console.log(err);
            });
    }

    function showNotification(message) {
        notification.textContent = message;
        setTimeout(() => {
            notification.textContent = '';
        }, 4000)
    }
})();
