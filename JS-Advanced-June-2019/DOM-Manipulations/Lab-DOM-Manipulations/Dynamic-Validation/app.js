function validate() {
    const pattern = /^[a-z]+@[a-z]+\.[a-z]+$/g;

    const email = document.getElementById('email');
    email.addEventListener('change', checkEmail);

    function checkEmail() {
        this.value.match(pattern)
            ? email.removeAttribute('class')
            : email.classList = 'error';
    }
}
