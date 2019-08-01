function focus() {
    [...document.getElementsByTagName('input')].forEach((input) => {
        input.addEventListener('focus', setClass);
    });

    function setClass() {
        this.parentElement.setAttribute('class', 'focused');
        this.addEventListener('blur', removeClass);
    }

    function removeClass() {
        this.parentElement.removeAttribute('class');
    }
}
