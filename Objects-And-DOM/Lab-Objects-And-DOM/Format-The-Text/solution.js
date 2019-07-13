function solve() {
  const text = document.querySelector('p[id="input"]').textContent.split(/\./);
  const output = document.querySelector('div[id="output"]');

  for (let i = 0; i < text.length; i += 3) {
    const [first, second, third] = [text[i], text[i + 1], text[i + 2]];

    const p = document.createElement('p');
    p.textContent += first + '.';

    if (second) {
      p.textContent += second + '.';
    }

    if (third) {
      p.textContent += third + '.';
    }

    output.appendChild(p);
  }
}
