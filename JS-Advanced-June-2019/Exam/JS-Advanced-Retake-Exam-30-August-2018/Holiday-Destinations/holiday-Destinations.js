function addDestination() {
    const city = document.querySelectorAll('input.inputData')[0];
    const country = document.querySelectorAll('input.inputData')[1];
    const seasons = document.getElementById('seasons');
    const season = seasons.options[seasons.selectedIndex];

    if (!city.value || !country.value) {
        return;
    }

    const destinationsList = document.getElementById('destinationsList');
    const tr = document.createElement('tr');
    const tdDestionation = document.createElement('td');
    const tdSeason = document.createElement('td');

    tdDestionation.textContent = `${city.value}, ${country.value}`;
    tdSeason.textContent = season.value.slice(0, 1).toUpperCase() + season.value.slice(1).toLowerCase();
    tr.appendChild(tdDestionation);
    tr.appendChild(tdSeason);
    destinationsList.appendChild(tr);

    const summary = document.querySelector(`#summaryBox #${season.value}`);
    summary.value = Number(summary.value) + 1;

    [city.value, country.value, seasons.selectedIndex] = ['', '', 0];
}
