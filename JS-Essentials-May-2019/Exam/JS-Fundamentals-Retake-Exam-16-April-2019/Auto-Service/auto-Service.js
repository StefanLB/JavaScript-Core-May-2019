function autoService(params) {
    let [instructions, addPart] = [[], []];

    for (let tokens of params) {

        if (tokens.indexOf('instructions') > -1) {
            let model = tokens.split(' ').map((x) => x.trim()).filter((x) => x)[1];

            if (instructions.indexOf(model) === -1) {
                instructions.push(model);
            }
        } else if (tokens.indexOf('addPart') > -1) {
            let [model, part, serial] = tokens.split(' ')
                .map((x) => x.trim()).filter((x) => x).slice(1);

            if (!addPart[model]) {
                addPart[model] = {};
            }

            if (!addPart[model][part]) {
                addPart[model][part] = [];
            }

            addPart[model][part].push(serial);

        } else if (tokens.indexOf('repair') > -1) {
            let [model, data] = tokens.split(' ')
                .map((x) => x.trim()).filter((x) => x).slice(1);

            if (instructions.indexOf(model) === -1) {
                console.log(`${model} is not supported`);
                continue;
            }

            let specifications = JSON.parse(data);
            Object.entries(specifications).forEach((info) => {
                let [part, condition] = info.map((x) => x.trim()).filter((x) => x);

                if (condition === 'broken' && addPart[model] && addPart[model][part]) {
                    let replacementPart = addPart[model][part].shift();
                    specifications[part] = replacementPart;
                }
            });

            console.log(`${model} client - ${JSON.stringify(specifications)}`);
        }
    }

    Object.entries(addPart)
        .sort((a, b) => {
            return a[0].localeCompare(b[0]);
        })
        .forEach(([model, parts]) => {
            console.log(`${model} - ${JSON.stringify(parts)}`);
        });
}
