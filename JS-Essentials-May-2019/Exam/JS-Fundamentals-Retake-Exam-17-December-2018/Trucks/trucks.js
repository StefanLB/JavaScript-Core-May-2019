function trucks(inputMat) {
    let [trucksObj, tiresArr] = [{}, []];

    for (let tokens of inputMat) {

        if (tokens.includes('NEWTRUCK')) {
            let [plateNum, tires] = tokens.slice(1);

            if (!trucksObj[plateNum]) {
                trucksObj[plateNum] = { tires, distance: 0 };
            }
        } else if (tokens.includes('NEWTIRES')) {
            let tires = tokens.slice(1);
            tiresArr.push(tires);

        } else if (tokens.includes('WORK')) {
            let [plateNum, distance] = tokens.slice(1);

            if (!trucksObj[plateNum]) {
                continue;
            }

            let tiresRating = distance * 0.001;
            let tiresCheck = trucksObj[plateNum].tires.every((tire) => tire >= tiresRating);

            if (!tiresCheck) {
                let newTires = tiresArr.shift()[0];
                trucksObj[plateNum].tires = newTires;
                tiresCheck = trucksObj[plateNum].tires.every((tire) => tire >= tiresRating);
            }

            if (tiresCheck) {
                let usage = trucksObj[plateNum].tires.map((tire) => tire -= tiresRating);
                trucksObj[plateNum].tires = usage;
                trucksObj[plateNum].distance += distance;
            }
        }
    }

    Object.entries(trucksObj).forEach((info) => {
        let [truck, distance] = [info[0], info[1].distance];
        console.log(`Truck ${truck} has traveled ${distance}.`);
    });

    console.log(`You have ${tiresArr.length} sets of tires left.`);
}
