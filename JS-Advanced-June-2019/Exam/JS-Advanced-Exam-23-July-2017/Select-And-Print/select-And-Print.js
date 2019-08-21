function move(command) {
    const availableTowns = document.querySelector('#available-towns');
    const selectedTowns = document.querySelector('#selected-towns');

    if (command === 'left') {
        const selected = selectedTowns.options[selectedTowns.selectedIndex];
        const townName = selected.value;

        const movingTown = Array.from(selectedTowns.children).filter((t) => t.value === townName);
        const remainingTown = Array.from(selectedTowns.children).filter((t) => t.value !== townName);

        selectedTowns.textContent = '';

        movingTown.forEach((t) => {
            const option = document.createElement('option');
            option.textContent = t.value;
            availableTowns.appendChild(option);
        });

        remainingTown.forEach((t) => {
            const option = document.createElement('option');
            option.textContent = t.value;
            selectedTowns.appendChild(option);
        });

    } else if (command === 'right') {
        const available = availableTowns.options[availableTowns.selectedIndex];
        const townName = available.value;

        const movingTown = Array.from(availableTowns.children).filter((t) => t.value === townName);
        const remainingTown = Array.from(availableTowns.children).filter((t) => t.value !== townName);

        availableTowns.textContent = '';

        movingTown.forEach((t) => {
            const option = document.createElement('option');
            option.textContent = t.value;
            selectedTowns.appendChild(option);
        });

        remainingTown.forEach((t) => {
            const option = document.createElement('option');
            option.textContent = t.value;
            availableTowns.appendChild(option);
        });
    } else if (command === 'print') {
        const selectedList = Array.from(selectedTowns.children).map((t) => t.textContent);
        document.querySelector('#output').textContent = selectedList.join('; ');
    }
}
