function addProduct() {
    const product = document.querySelector('#add-product > label:nth-child(2) > input[type=text]');
    const price = document.querySelector('#add-product > label:nth-child(3) > input[type=number]');
    let totalCost = document.querySelector('#bill > tfoot > tr > td:nth-child(2)');
    let table = document.querySelector('#product-list');

    if (product.value === '' || Number(price.value) <= 0) {
        [product.value, price.value] = ['', ''];
        return;
    }

    currentCost = Number(totalCost.textContent);
    currentCost += Number(price.value);
    totalCost.textContent = currentCost;

    const tr = document.createElement('tr');
    const tdFirst = document.createElement('td');
    const tdLast = document.createElement('td');

    tdFirst.textContent = product.value;
    tdLast.textContent = price.value;

    tr.appendChild(tdFirst);
    tr.appendChild(tdLast);
    table.appendChild(tr);

    [product.value, price.value] = ['', ''];
}
