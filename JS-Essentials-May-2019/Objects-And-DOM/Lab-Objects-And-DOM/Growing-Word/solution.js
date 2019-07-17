function growingWord() {
  const colors = ['red', 'blue', 'green'];
  const p = document.querySelector('#exercise p');
  p.counter = p.counter + 1 || 1;
  p.style.color = colors[p.counter % 3];
  p.style.fontSize = `${2 ** p.counter}px`;
}
