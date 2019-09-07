(async function () {
    try {
        const src = await fetch('./contact.hbs').then((res) => res.text());

        const template = Handlebars.compile(src);
        document.getElementById('contacts').innerHTML = template({ contacts });

        [...document.getElementsByTagName('button')].forEach((button) => {
            button.addEventListener('click', toggleInfo);
        });
    } catch (err) {
        console.error(err);
    }
})();

const toggleInfo = function () {
    let div = this.nextElementSibling;

    if (div.style.display === 'none') {
        div.style.display = 'block';
    } else if (div.style.display === 'block') {
        div.style.display = 'none';
    }
};
