function wordsUppercase(text) {
    console.log(text.toUpperCase().split(/\W+/).filter((x) => x !== '').join(', '));
}
