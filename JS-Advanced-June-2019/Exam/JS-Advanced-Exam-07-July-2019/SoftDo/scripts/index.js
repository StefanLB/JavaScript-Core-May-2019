function mySolution() {
    document.querySelector('#inputSection button').addEventListener('click', askQuestion);

    function askQuestion() {
        const question = document.querySelector('#inputSection textarea');
        const username = document.querySelector('#inputSection input');

        const divPending = document.createElement('div');
        divPending.classList.add('pendingQuestion');

        const imgPending = document.createElement('img');
        imgPending.src = './images/user.png';
        imgPending.width = 32;
        imgPending.height = 32;
        divPending.appendChild(imgPending);

        const spanPending = document.createElement('span');
        spanPending.textContent = username.value || 'Anonymous';
        divPending.appendChild(spanPending);

        const pPending = document.createElement('p');
        pPending.textContent = question.value;
        divPending.appendChild(pPending);

        const divActions = document.createElement('div');
        divActions.classList.add('actions');

        const buttonArchive = document.createElement('button');
        buttonArchive.classList.add('archive');
        buttonArchive.textContent = 'Archive';
        buttonArchive.addEventListener('click', archiveQuestion);
        divActions.appendChild(buttonArchive);

        const buttonOpen = document.createElement('button');
        buttonOpen.classList.add('open');
        buttonOpen.textContent = 'Open';
        buttonOpen.addEventListener('click', openQuestion);
        divActions.appendChild(buttonOpen);

        divPending.appendChild(divActions);
        document.getElementById('pendingQuestions').appendChild(divPending);
        [question.value, username.value] = ['', ''];
    }

    function archiveQuestion() {
        const parentDiv = this.parentNode.parentNode.parentNode;
        const childDiv = this.parentNode.parentNode;
        parentDiv.removeChild(childDiv);
    }

    function openQuestion() {
        const parentDiv = this.parentNode.parentNode.parentNode;
        const childDiv = this.parentNode.parentNode;

        const username = childDiv.querySelector('span').textContent;
        const question = childDiv.querySelector('p').textContent;

        parentDiv.removeChild(childDiv);

        const divOpen = document.createElement('div');
        divOpen.classList.add('openQuestion');

        const imgOpen = document.createElement('img');
        imgOpen.src = './images/user.png';
        imgOpen.width = 32;
        imgOpen.height = 32;
        divOpen.appendChild(imgOpen);

        const spanOpen = document.createElement('span');
        spanOpen.textContent = username;
        divOpen.appendChild(spanOpen);

        const pOpen = document.createElement('p');
        pOpen.textContent = question;
        divOpen.appendChild(pOpen);

        const divActions = document.createElement('div');
        divActions.classList.add('actions');

        const buttonReply = document.createElement('button');
        buttonReply.classList.add('reply');
        buttonReply.textContent = 'Reply';
        buttonReply.addEventListener('click', replyQuestion);
        divActions.appendChild(buttonReply);
        divOpen.appendChild(divActions);

        const divReply = document.createElement('div');
        divReply.classList.add('replySection');
        divReply.style.display = 'none';

        const inputReply = document.createElement('input');
        inputReply.classList.add('replyInput');
        inputReply.type = 'text';
        inputReply.placeholder = 'Reply to this question here...';
        divReply.appendChild(inputReply);

        const buttonSend = document.createElement('button');
        buttonSend.classList.add('replyButton');
        buttonSend.textContent = 'Send';
        buttonSend.addEventListener('click', sendReply);
        divReply.appendChild(buttonSend);

        const olReply = document.createElement('ol');
        olReply.classList.add('reply');
        olReply.type = 1;
        divReply.appendChild(olReply);

        divOpen.appendChild(divReply);
        document.getElementById('openQuestions').appendChild(divOpen);
    }

    function replyQuestion() {
        const buttonReply = this;
        const divReply = this.parentNode.nextElementSibling;

        if (divReply.style.display === 'none') {
            divReply.style.display = 'block';
            buttonReply.textContent = 'Back';
        } else if (divReply.style.display === 'block') {
            divReply.style.display = 'none';
            buttonReply.textContent = 'Reply';
        }
    }

    function sendReply() {
        const inputReply = this.previousElementSibling;

        const liReply = document.createElement('li');
        liReply.textContent = inputReply.value;

        const olReply = this.nextElementSibling;
        olReply.appendChild(liReply);

        inputReply.value = '';
    }
}
