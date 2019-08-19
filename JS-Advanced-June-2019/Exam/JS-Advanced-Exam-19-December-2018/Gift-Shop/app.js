function solution() {

	const toyType = document.getElementById('toyType');
	const toyPrice = document.getElementById('toyPrice');
	const toyDescription = document.getElementById('toyDescription');

	if (toyType.value && !isNaN(toyPrice.value) &&
		toyDescription.value.length > 0 && toyDescription.value.length <= 50) {

		const div = document.createElement('div');
		div.className = 'gift';

		const img = document.createElement('img');
		img.src = './gift.png';

		const h2 = document.createElement('h2');
		h2.textContent = toyType.value;

		const p = document.createElement('p');
		p.textContent = toyDescription.value;

		const button = document.createElement('button');
		button.textContent = `Buy it for $${toyPrice.value}`;
		button.addEventListener('click', function () {
			this.parentNode.parentNode.removeChild(this.parentNode);
		});

		div.appendChild(img);
		div.appendChild(h2);
		div.appendChild(p);
		div.appendChild(button);
		document.getElementById('christmasGiftShop').appendChild(div);
	}

	[toyType.value, toyPrice.value, toyDescription.value] = ['', '', ''];
}
