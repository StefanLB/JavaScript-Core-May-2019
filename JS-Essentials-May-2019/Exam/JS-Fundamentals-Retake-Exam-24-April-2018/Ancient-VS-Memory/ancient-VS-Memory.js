function ancientVSMemory(paramsArr) {
    paramsArr
        .join(' ')
        .split(/32656 19759 32763/g)
        .filter((x) => x)
        .map((x) => x.trim())
        .map((x) => x.split(' '))
        .map((x) => x.map((x) => +x))
        .forEach((line) => {
            console.log(line
                .slice(3, line[1] + 3)
                .map((x) => String.fromCharCode(x))
                .join(''));
        });
}
