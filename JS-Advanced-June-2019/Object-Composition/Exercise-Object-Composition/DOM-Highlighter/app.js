function solve(selector) {

    (function changeClass(element) {

        if (!element.hasChildNodes()) {
            return;
        }

        element.classList.add('highlight');

        element = Array.from(element.childNodes).sort((a, b) => b.childNodes.length - a.childNodes.length)[0];

        changeClass(element);

    })(document.querySelector(selector));
}
