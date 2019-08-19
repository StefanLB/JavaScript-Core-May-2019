function acceptance() {
	const [company, product, quantity, scrape] = document.getElementsByTagName('input');

	if (company.value === '' || product.value === '') {
		return;
	}

	if (!Number(quantity.value) || !Number(scrape.value)) {
		return;
	}

	const available = Number(quantity.value) - Number(scrape.value);

	if (available <= 0) {
		return;
	}

	const div = document.createElement('div');
	const p = document.createElement('p');
	const button = document.createElement('button');

	p.textContent = `[${company.value}] ${product.value} - ${available} pieces`;
	button.setAttribute('type', 'button');
	button.textContent = 'Out of stock';
	button.addEventListener('click', removeStock);

	div.appendChild(p);
	div.appendChild(button);
	document.getElementById('warehouse').appendChild(div);

	[company.value, product.value, quantity.value, scrape.value] = ['', '', '', ''];

	function removeStock() {
		this.parentNode.parentNode.removeChild(this.parentNode);
	}
}
