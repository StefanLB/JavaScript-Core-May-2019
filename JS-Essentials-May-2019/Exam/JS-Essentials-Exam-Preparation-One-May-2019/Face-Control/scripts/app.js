function getData() {
	let infoList = JSON.parse(document.querySelector('textarea').value);
	let { criteria, action } = infoList.pop();
	let people = { peopleIn: [], blacklist: [], peopleOut: [] };

	infoList.forEach((info) => {
		let person = { 'firstName': info.firstName, 'lastName': info.lastName };

		if (info.action === 'peopleIn') {

			let isBanned = people.blacklist.find((face) => {
				return face.firstName === person.firstName && face.lastName === person.lastName;
			});

			if (isBanned === undefined) {
				people.peopleIn.push(person);
			}
		} else if (info.action === 'peopleOut') {

			people.peopleIn.forEach((face, index) => {
				if (face.firstName === person.firstName && face.lastName === person.lastName) {
					people.peopleIn.splice(index, 1);
					people.peopleOut.push(person);
				}
			});
		} else if (info.action === 'blacklist') {

			people.peopleIn.forEach((face, index) => {
				if (face.firstName === person.firstName && face.lastName === person.lastName) {
					people.peopleIn.splice(index, 1);
					people.peopleOut.push(person);
				}
			});

			people.blacklist.push(person);
		}
	});

	if (criteria !== '' && action !== '') {
		people[action].sort((a, b) => a[criteria].localeCompare(b[criteria]));
	}

	document.querySelector('#peopleIn p').textContent =
		people.peopleIn.map((person) => JSON.stringify(person));

	document.querySelector('#blacklist p').textContent =
		people.blacklist.map((person) => JSON.stringify(person));

	document.querySelector('#peopleOut p').textContent =
		people.peopleOut.map((person) => JSON.stringify(person));
}
