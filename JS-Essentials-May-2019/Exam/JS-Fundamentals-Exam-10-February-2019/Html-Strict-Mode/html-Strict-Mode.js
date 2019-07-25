function htmlStrictMode(input) {
    const firstPattern = /^<(\w+)>(.+)<\/\1>$/;
    const secondPattern = /<\/*\w+>/gi;

    const words = input
        .filter((x) => firstPattern.test(x))
        .map((x) => x.replace(secondPattern, ''))
        .join(' ');

    console.log(words);
}
