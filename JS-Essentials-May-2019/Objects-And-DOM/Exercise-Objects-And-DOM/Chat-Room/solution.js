function solve() {
    const messagesList = document.getElementById('chat_messages');
    const div = document.createElement('div');

    document.getElementById('send').addEventListener('click', function () {
        const message = document.getElementById('chat_input');
        const divClone = div.cloneNode();
        divClone.className = 'message my-message';
        divClone.textContent = message.value;
        messagesList.appendChild(divClone);
        message.value = '';
    });
}
