function sort(colIndex, descending) {
    console.log(colIndex, descending);

    const tbody = document.querySelector('tbody');
    const input = [...tbody.querySelectorAll('tbody tr td')];
    const info = {};

    for (let index = 0; index < input.length; index += 2) {
        const product = input[index].textContent;
        const price = input[index + 1].textContent;
        info[product] = Number(price);
    }

    let outputInfo = [];
    if (colIndex === 0 && descending === false) {
        outputInfo = Object.entries(info).sort((a, b) => a[0].localeCompare(b[0]));

    } else if (colIndex === 0 && descending === true) {
        outputInfo = Object.entries(info).sort((a, b) => b[0].localeCompare(a[0]));

    } else if (colIndex === 1 && descending === false) {
        outputInfo = Object.entries(info).sort((a, b) => a[1] - b[1]);
    } else if (colIndex === 1 && descending === true) {
        outputInfo = Object.entries(info).sort((a, b) => b[1] - a[1]);
    }

    tbody.textContent = '';
    outputInfo.forEach(([product, price]) => {
        const tr = document.createElement('tr');
        const tdProduct = document.createElement('td');
        const tdPrice = document.createElement('td');

        tdProduct.textContent = product;
        tdPrice.textContent = price.toFixed(2);
        tr.appendChild(tdProduct);
        tr.appendChild(tdPrice);
        tbody.appendChild(tr);
    });
}
