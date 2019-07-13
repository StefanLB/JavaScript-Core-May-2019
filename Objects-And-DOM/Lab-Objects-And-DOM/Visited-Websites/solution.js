function solve() {
  Array.from(document.getElementsByTagName('a')).forEach((a) => {
    a.addEventListener('click', increaseCount);
  });

  function increaseCount() {
    let span = this.nextElementSibling;
    let [firstWord, count, lastWord] = span.textContent.split(/ /);
    span.textContent = `${firstWord} ${++count} ${lastWord}`;
  }
}
