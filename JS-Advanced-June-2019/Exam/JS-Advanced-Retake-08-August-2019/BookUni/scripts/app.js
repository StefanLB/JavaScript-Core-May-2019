function solve() {
    document.querySelector('button').addEventListener('click', addBook);

    const oldBooks = document.querySelector("#outputs > section:nth-child(1) > div");
    const newBooks = document.querySelector("#outputs > section:nth-child(2) > div");
    const totalProfit = document.querySelector("body > h1:nth-child(3)");

    function addBook(event) {
        event.preventDefault();
        const [title, year, price] = Array.from(document.getElementsByTagName('input'));

        if (typeof title.value !== 'string' || title.value === '') {
            return;
        }

        if (!isNaN(year.value) && Number(year.value) < 0) {
            return;
        }

        if (!isNaN(price.value) && Number(price.value) < 0) {
            return;
        }

        const div = document.createElement('div');
        div.setAttribute('class', 'book');

        const p = document.createElement('p');
        p.textContent = `${title.value} [${year.value}]`;
        div.appendChild(p);

        const buttonBuy = document.createElement('button');
        buttonBuy.addEventListener('click', buyBook);
        div.appendChild(buttonBuy);

        if (year.value < 2000) {
            buttonBuy.textContent = `Buy it only for ${(Number(price.value) * 0.85).toFixed(2)} BGN`;
            oldBooks.appendChild(div);

        } else if (year.value >= 2000) {
            buttonBuy.textContent = `Buy it only for ${Number(price.value).toFixed(2)} BGN`;
            newBooks.appendChild(div);

            const buttonMove = document.createElement('button');
            buttonMove.textContent = 'Move to old section';
            buttonMove.addEventListener('click', moveBook);
            div.appendChild(buttonMove);
        }

        [title.value, year.value, price.value] = ['', '', ''];
    }

    function buyBook() {
        const parent = this.parentNode.parentNode;
        const child = this.parentNode;

        const buyInfo = this.textContent.split(' ');
        const price = Number(buyInfo[4]);

        const profitInfo = totalProfit.textContent.split(' ');
        const profit = Number(profitInfo[3]);

        profitInfo[3] = (profit + price).toFixed(2);
        totalProfit.textContent = profitInfo.join(' ');

        parent.removeChild(child);
    }

    function moveBook() {
        const parent = this.parentNode.parentNode;
        const child = this.parentNode;

        const buyInfo = this.previousElementSibling.textContent.split(' ');
        const price = Number(buyInfo[4]);

        buyInfo[4] = (price * 0.85).toFixed(2);
        this.previousElementSibling.textContent = buyInfo.join(' ');

        child.removeChild(this);
        parent.removeChild(child);

        oldBooks.appendChild(child);
    }
}
