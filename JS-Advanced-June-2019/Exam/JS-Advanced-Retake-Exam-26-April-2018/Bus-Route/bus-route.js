function busRoute() {
    const firstStop = document.querySelector('input[name="first-stop"]');
    const lastStop = document.querySelector('input[name="last-stop"]');

    if (firstStop.value === '' || lastStop.value === '') {
        return;
    }

    const [firstBusStop, lastBusStop] = [Number(firstStop.value), Number(lastStop.value)];

    if (firstBusStop <= 0 || lastBusStop <= 0) {
        return;
    }

    const busStops = document.querySelectorAll('#bus-stops li');

    if (firstBusStop >= busStops.length || lastBusStop > busStops.length) {
        return;
    }

    if (firstBusStop >= lastBusStop) {
        return;
    }

    const selectedRoute = document.querySelector('#selected-route span');
    selectedRoute.textContent = `${firstStop.value}-${lastStop.value}`;

    const selectedBusStops = document.getElementById('selected-bus-stops');
    selectedBusStops.textContent = '';
    for (let index = firstBusStop - 1; index <= lastBusStop - 1; index++) {
        const li = document.createElement('li');
        li.textContent = busStops[index].textContent;
        selectedBusStops.appendChild(li);
    }

    [firstStop.value, lastStop.value] = ['', ''];
}
