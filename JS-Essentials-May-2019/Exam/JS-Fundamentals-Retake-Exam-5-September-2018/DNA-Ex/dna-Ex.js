function dNAex(paramsArr) {
    let linePattern = /^([a-z+(!@#$?)]+)=(\d+)--(\d+)<<([a-z]+)$/;
    let namePattern = /[a-z]+/g;
    let genesObj = {};

    for (let tokens of paramsArr) {

        let info = tokens.match(linePattern);
        if (info === null) {
            continue;
        }

        let genesName = +info[1].match(namePattern).join('').length;
        let genesLength = +info[2];
        if (genesName !== genesLength) {
            continue;
        }

        let genesCount = +info[3];
        let genesOrganism = info[4];
        if (!genesObj[genesOrganism]) {
            genesObj[genesOrganism] = 0;
        }

        genesObj[genesOrganism] += genesCount;
    }

    Object.entries(genesObj).sort((a, b) => b[1] - a[1])
        .forEach((genesArr) => {
            let [organism, genome] = genesArr;
            console.log(`${organism} has genome size of ${genome}`);
        });
}
