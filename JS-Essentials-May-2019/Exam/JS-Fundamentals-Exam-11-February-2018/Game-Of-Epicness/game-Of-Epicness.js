function gameOfEpicness(paramsObj, paramsArr) {
    let kingdomsObj = {};

    for (let tokensObj of paramsObj) {

        let kingdomName = tokensObj.kingdom
        let generalName = tokensObj.general
        let armyCount = tokensObj.army

        if (!kingdomsObj[kingdomName]) {
            kingdomsObj[kingdomName] = {};
        }

        if (!kingdomsObj[kingdomName][generalName]) {
            kingdomsObj[kingdomName][generalName] = { army: 0, wins: 0, losses: 0 };
        }

        kingdomsObj[kingdomName][generalName].army += armyCount;
    }

    for (let tokensArr of paramsArr) {

        let [attackingKingdom, attackingGeneral, defendingKingdom, defendingGeneral] = tokensArr;

        if (attackingKingdom === defendingKingdom) {
            continue;
        }

        let attackingArmy = kingdomsObj[attackingKingdom][attackingGeneral];
        let defendingArmy = kingdomsObj[defendingKingdom][defendingGeneral];

        if (attackingArmy.army > defendingArmy.army) {
            attackingArmy.wins++;
            defendingArmy.losses++;

            attackingArmy.army = Math.trunc(attackingArmy.army * 1.1);
            defendingArmy.army = Math.trunc(defendingArmy.army * 0.9);
        }

        if (attackingArmy.army < defendingArmy.army) {
            defendingArmy.wins++;
            attackingArmy.losses++;

            defendingArmy.army = Math.trunc(defendingArmy.army * 1.1);
            attackingArmy.army = Math.trunc(attackingArmy.army * 0.9);

        }
    }

    let sortedKingdoms = Object.entries(kingdomsObj).sort((kingdomA, kingdomB) => {
        return Object.entries(kingdomB[1]).map((generalB) => generalB[1].wins).reduce((x, y) => x + y, 0) -
            Object.entries(kingdomA[1]).map((generalA) => generalA[1].wins).reduce((x, y) => x + y, 0) ||
            Object.entries(kingdomA[1]).map((generalA) => generalA[1].losses).reduce((x, y) => x + y, 0) -
            Object.entries(kingdomB[1]).map((generalB) => generalB[1].losses).reduce((x, y) => x + y, 0) ||
            kingdomA[0].localeCompare(kingdomB[0]);

    })[0];

    console.log(`Winner: ${sortedKingdoms[0]}`);

    let sortedGenerals = Object.entries(sortedKingdoms[1]).sort((generalA, generalB) => {
        return generalB[1].army - generalA[1].army;
    });

    for (let [generalName, generalsObj] of sortedGenerals) {
        console.log(`/\\general: ${generalName}`);
        console.log(`---army: ${generalsObj.army}`);
        console.log(`---wins: ${generalsObj.wins}`);
        console.log(`---losses: ${generalsObj.losses}`);
    }
}
