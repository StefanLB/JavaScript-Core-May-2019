function solve() {
    const checkout = document.getElementsByClassName('checkout')[0];
    const addProducts = document.getElementsByClassName('add-product');

    checkout.addEventListener('click', closeOrder);
    Array.from(addProducts).forEach((button) => {
        button.addEventListener('click', addProduct);
    });

    const textarea = document.getElementsByTagName('textarea')[0];
    let [cartList, totalPrice] = [[], 0];

    function addProduct() {
        const title = this.parentNode.parentNode.querySelector('.product-title').textContent;
        const price = this.parentNode.parentNode.querySelector('.product-line-price').textContent;
        cartList.push(title);
        totalPrice += Number(price);
        textarea.textContent += `Added ${title} for ${price} to the cart.\n`;
    }

    function closeOrder() {
        let filteredList = cartList.filter((v, i, s) => s.indexOf(v) === i);
        textarea.textContent += `You bought ${filteredList.join(', ')} for ${totalPrice.toFixed(2)}.`;

        checkout.removeEventListener('click', closeOrder);
        Array.from(addProducts).forEach((button) => {
            button.removeEventListener('click', addProduct);
        });
    }
}
