function create(sentences) {
   const content = document.getElementById('content');

   sentences.forEach((sentence) => {
      const div = document.createElement('div');
      const p = document.createElement('p');

      p.textContent = sentence;
      p.style.display = 'none';
      div.appendChild(p);

      div.addEventListener('click', () => {
         p.style.display = 'block';
      });

      content.appendChild(div);
   });
}