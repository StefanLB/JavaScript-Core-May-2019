const result = (function () {
    let [stopName, stopNext] = ['', 'depot'];
    const info = document.querySelector('#info .info');

    function depart() {
        const baseURL = `https://judgetests.firebaseio.com/schedule/${stopNext}.json`;

        fetch(baseURL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (!res.ok) {
                    throw res;
                }
            })
            .then((data) => displayInfo(data))
            .catch((err) => handleError(err));
    }

    function displayInfo(data) {
        [stopName, stopNext] = [data.name, data.next];
        printMessage(`Next stop ${stopName}`);
        toggleButtons('depart', 'arrive');
    }

    function handleError() {
        printMessage('Error');
        document.getElementById('depart').disabled = true;
        document.getElementById('arrive').disabled = true;
    }

    function arrive() {
        printMessage(`Arriving at ${stopName}`);
        toggleButtons('arrive', 'depart');
    }

    function toggleButtons(disable, enable) {
        document.getElementById(`${disable}`).disabled = true;
        document.getElementById(`${enable}`).disabled = false;
    }

    function printMessage(message) {
        info.textContent = message;
    }

    return { depart, arrive };
})();
