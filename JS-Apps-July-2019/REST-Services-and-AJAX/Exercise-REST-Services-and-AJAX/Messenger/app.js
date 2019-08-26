(function () {
    document.getElementById('submit').addEventListener('click', postInfo);
    document.getElementById('refresh').addEventListener('click', getInfo);
    document.getElementById('delete').addEventListener('click', deleteInfo);

    const messages = document.getElementById('messages');
    const baseURL = 'https://messenger-381da.firebaseio.com/messenger.json';

    function deleteInfo() {
        fetch(baseURL, {
            method: 'DELETE'
        })
            .then(() => {
                messages.textContent = 'DataBase has been deleted...';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function postInfo() {
        const author = document.getElementById('author');
        const content = document.getElementById('content');

        if (author.value === '' || content.value === '') {
            return;
        }

        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: author.value,
                content: content.value,
                timestamp: Date.now()
            })
        })
            .then(() => {
                [author.value, content.value] = ['', ''];
            })
            .catch(() => {
                messages.textContent = 'Error';
            });
    }

    function getInfo() {

        fetch(baseURL, {
            method: 'GET'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                messages.textContent = '';
                const output = [];

                Object.values(data)
                    .sort((a, b) => {
                        return a.timestamp - b.timestamp;
                    })
                    .forEach((info) => {
                        output.push(`${info.author}: ${info.content}`);
                    });
                messages.textContent = output.join('\n');
            })
            .catch(() => {
                messages.textContent = 'There are no masseges in DataBase.';
            });
    }
})();
