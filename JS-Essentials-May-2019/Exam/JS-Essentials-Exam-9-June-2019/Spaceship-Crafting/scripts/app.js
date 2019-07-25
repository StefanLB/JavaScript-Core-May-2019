function spaceshipCrafting() {
	const titaniumCoreFound = document.getElementById('titaniumCoreFound').value;
	const aluminiumCoreFound = document.getElementById('aluminiumCoreFound').value;
	const magnesiumCoreFound = document.getElementById('magnesiumCoreFound').value;
	const carbonCoreFound = document.getElementById('carbonCoreFound').value;
	const lossesPercent = document.getElementById('lossesPercent').value;

	const splitPercentage = lossesPercent / 4 / 100;

	const titaniumQuantity = titaniumCoreFound - titaniumCoreFound * splitPercentage;
	const aluminiumQuantity = aluminiumCoreFound - aluminiumCoreFound * splitPercentage;
	const magnesiumQuantity = magnesiumCoreFound - magnesiumCoreFound * splitPercentage;
	const carbonQuantity = carbonCoreFound - carbonCoreFound * splitPercentage;

	const productPrice = {
		'titanium bar': 25,
		'aluminum bar': 50,
		'magnesium bar': 75,
		'carbon bar': 100
	};

	let titaniumBar = Math.round(titaniumQuantity / productPrice['titanium bar']);
	let aluminumBar = Math.round(aluminiumQuantity / productPrice['aluminum bar']);
	let magnesiumBar = Math.round(magnesiumQuantity / productPrice['magnesium bar']);
	let carbonBar = Math.round(carbonQuantity / productPrice['carbon bar']);

	const buildSpaceships = {
		'THE-UNDEFINED-SHIP': 0,
		'NULL-MASTER': 0,
		'JSON-CREW': 0,
		'FALSE-FLEET': 0
	};

	while (titaniumBar >= 2 && aluminumBar >= 2 && magnesiumBar >= 3 && carbonBar >= 1) {

		if (titaniumBar >= 7 && aluminumBar >= 9 && magnesiumBar >= 7 && carbonBar >= 7) {
			titaniumBar -= 7;
			aluminumBar -= 9;
			magnesiumBar -= 7;
			carbonBar -= 7;
			buildSpaceships['THE-UNDEFINED-SHIP'] += 1;
		}

		if (titaniumBar >= 5 && aluminumBar >= 7 && magnesiumBar >= 7 && carbonBar >= 5) {
			titaniumBar -= 5;
			aluminumBar -= 7;
			magnesiumBar -= 7;
			carbonBar -= 5;
			buildSpaceships['NULL-MASTER'] += 1;
		}

		if (titaniumBar >= 3 && aluminumBar >= 5 && magnesiumBar >= 5 && carbonBar >= 2) {
			titaniumBar -= 3;
			aluminumBar -= 5;
			magnesiumBar -= 5;
			carbonBar -= 2;
			buildSpaceships['JSON-CREW'] += 1;
		}

		if (titaniumBar >= 2 && aluminumBar >= 2 && magnesiumBar >= 3 && carbonBar >= 1) {
			titaniumBar -= 2;
			aluminumBar -= 2;
			magnesiumBar -= 3;
			carbonBar -= 1;
			buildSpaceships['FALSE-FLEET'] += 1;
		}
	}

	const firstRes = `${titaniumBar} titanium bars, ${aluminumBar} aluminum bars, ` +
		`${magnesiumBar} magnesium bars, ${carbonBar} carbon bars`;
	document.querySelector('#availableBars p').textContent = firstRes;

	const secondRes = [];
	Object.entries(buildSpaceships).filter(([spaceShip, count]) => count > 0)
		.forEach(([spaceShip, count]) => secondRes.push(`${count} ${spaceShip}`));
	document.querySelector('#builtSpaceships p').textContent = secondRes.join(', ');
}
