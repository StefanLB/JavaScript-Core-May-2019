function arenaTier(params) {
    let gladiatorsObj = {};
    
    params.forEach((tokens) => {

        if (tokens.includes(' -> ')) {
            let [gladiator, technique, skill] = tokens.split(' -> ');
            add(gladiator, technique, skill);

        } else if (tokens.includes(' vs ')) {
            let [gladiatorA, gladiatorB] = tokens.split(' vs ');

            if (gladiatorsObj[gladiatorA] && gladiatorsObj[gladiatorB]) {
                fight(gladiatorA, gladiatorB);
            }
        }
    });

    let sortedGladiators = Object.entries(gladiatorsObj).sort((gladiatorA, gladiatorB) => {
        return Object.values(gladiatorB[1]).reduce((a, b) => a + b, 0) -
            Object.values(gladiatorA[1]).reduce((a, b) => a + b, 0) ||
            gladiatorA[0].localeCompare(gladiatorB[0]);
    });

    for (let [gladiator, techniqueObj] of sortedGladiators) {
        let totalSkill = Object.values(techniqueObj).reduce((a, b) => a + b, 0);
        console.log(`${gladiator}: ${totalSkill} skill`);

        let sortedTechnique = Object.entries(techniqueObj).sort((techniqueA, techniqueB) => {
            return techniqueB[1] - techniqueA[1] || techniqueA[0].localeCompare(techniqueB[0]);
        });

        for (let [technique, skill] of sortedTechnique) {
            console.log(`- ${technique} <!> ${skill}`);
        }
    }

    function add(gladiator, technique, skill) {
        if (!gladiatorsObj[gladiator]) {
            gladiatorsObj[gladiator] = {};
        }

        if (!gladiatorsObj[gladiator][technique]) {
            gladiatorsObj[gladiator][technique] = 0;
        }

        if (gladiatorsObj[gladiator][technique] < +skill) {
            gladiatorsObj[gladiator][technique] = +skill;
        }
    }

    function fight(gladiatorA, gladiatorB) {

        for (let techniqueA in gladiatorsObj[gladiatorA]) {

            for (let techniqueB in gladiatorsObj[gladiatorB]) {

                if (techniqueA === techniqueB &&
                    gladiatorsObj[gladiatorA][techniqueA] >
                    gladiatorsObj[gladiatorB][techniqueB]) {
                    return delete gladiatorsObj[gladiatorB];

                } else if (techniqueA === techniqueB &&
                    gladiatorsObj[gladiatorA][techniqueA] <
                    gladiatorsObj[gladiatorB][techniqueB]) {
                    return delete gladiatorsObj[gladiatorA];
                }
            }
        }
    }
}
