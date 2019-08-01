function attachEventsListeners() {
    const unitsList = {
        'm': 1,
        'mm': 1000,
        'cm': 100,
        'mi': 0.000621371192,
        'in': 39.3700787,
        'km': 0.001,
        'ft': 3.2808399,
        'yrd': 1.0936133
    };

    document.getElementById('convert').addEventListener('click', () => {

        const inputValue = document.getElementById('inputDistance').value;
        const inputType = document.getElementById('inputUnits').value;
        const outputValue = document.getElementById('outputDistance');
        const outputType = document.getElementById('outputUnits').value;

        outputValue.value = inputValue / unitsList[inputType] * unitsList[outputType];
    });
}
