function solve() {
    let [trucksObj, tiresArr] = [{}, []];
    let trucksList = document.getElementsByTagName('section')[1].querySelectorAll('fieldset')[1];
    let tiresList = document.getElementsByTagName('section')[1].querySelectorAll('fieldset')[0];

    let textarea = document.querySelector('textarea');
    document.querySelectorAll('button')[3].addEventListener('click', shiftEnd);

    function shiftEnd() {
        Object.entries(trucksObj).forEach((info) => {
            let [truck, distance] = [info[0], info[1].distance];
            textarea.textContent += `Truck ${truck} has traveled ${distance}.\n`;
        });

        textarea.textContent += `You have ${tiresArr.length} sets of tires left.\n`;
    }

    [...document.getElementsByTagName('button')].slice(0, 3).forEach((button) => {
        button.addEventListener('click', function () {
            const command = this.parentNode.firstElementChild.textContent;

            if (command === 'NEWTRUCK') {
                let plateNum = document.getElementById('newTruckPlateNumber');
                let tiresStr = document.getElementById('newTruckTiresCondition');
                let tires = tiresStr.value.split(/\s+/).map(Number);

                if (!trucksObj[plateNum.value]) {
                    trucksObj[plateNum.value] = { tires, distance: 0 };

                    trucksList.textContent = '';
                    let legend = document.createElement('legend');
                    legend.textContent = 'Trucks';
                    trucksList.appendChild(legend);

                    Object.keys(trucksObj).forEach((truck) => {
                        let div = document.createElement('div');
                        div.setAttribute('class', 'truck');
                        div.textContent = truck;
                        trucksList.appendChild(div);
                    });
                }

                [plateNum.value, tiresStr.value] = ['', ''];

            } else if (command === 'NEWTIRES') {
                let tires = document.getElementById('newTiresCondition');
                tiresArr.push(tires.value.split(/ /).map(Number));

                tiresList.textContent = '';
                let legend = document.createElement('legend');
                legend.textContent = 'Backup tires sets';
                tiresList.appendChild(legend);

                tiresArr.forEach((tire) => {
                    let div = document.createElement('div');
                    div.setAttribute('class', 'tireSet');
                    div.textContent = tire.join(' ');
                    tiresList.appendChild(div);
                });

                tires.value = '';
            } else if (command === 'WORK') {
                let plateNum = document.getElementById('workPlateNumber');
                let distance = document.getElementById('distance');

                if (!trucksObj[plateNum.value]) {
                    [plateNum.value, distance.value] = ['', ''];
                    return;
                }

                let tiresRating = Number(distance.value) * 0.001;
                let tiresCheck = trucksObj[plateNum.value].tires.every((tire) => tire >= tiresRating);

                if (!tiresCheck) {
                    let newTires = tiresArr.shift();

                    tiresList.textContent = '';
                    let legend = document.createElement('legend');
                    legend.textContent = 'Backup tires sets';
                    tiresList.appendChild(legend);

                    tiresArr.forEach((tire) => {
                        let div = document.createElement('div');
                        div.setAttribute('class', 'tireSet');
                        div.textContent = tire.join(' ');
                        tiresList.appendChild(div);
                    });

                    trucksObj[plateNum.value].tires = newTires;
                    tiresCheck = trucksObj[plateNum.value].tires.every((tire) => tire >= tiresRating);
                }

                if (tiresCheck) {
                    let usage = trucksObj[plateNum.value].tires.map((tire) => tire -= tiresRating);
                    trucksObj[plateNum.value].tires = usage;
                    trucksObj[plateNum.value].distance += Number(distance.value);
                }

                [plateNum.value, distance.value] = ['', ''];
            }
        });
    });
}
