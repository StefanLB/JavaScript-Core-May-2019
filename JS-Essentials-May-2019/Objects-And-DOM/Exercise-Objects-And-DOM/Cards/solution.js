function solve() {
   Array.from(document.getElementsByTagName('img')).forEach((img) => {
      img.addEventListener('click', showCard);
   });

   function showCard() {
      let card = this;
      card.src = './images/whiteCard.jpg';
      card.removeEventListener('click', showCard);

      let spans = document.getElementById('result').children;
      let [leftSpan, rightSpan] = [spans[0], spans[2]];

      if (card.parentNode.id === 'player1Div') {
         leftSpan.textContent = card.name;

      } else if (card.parentNode.id === 'player2Div') {
         rightSpan.textContent = card.name;
      }

      if (spans[0].textContent && spans[2].textContent) {
         let winner;
         let loser;

         if (+leftSpan.textContent > +rightSpan.textContent) {
            winner = document.querySelector(`#player1Div img[name='${leftSpan.textContent}']`);
            loser = document.querySelector(`#player2Div img[name='${rightSpan.textContent}']`);

         } else if (+leftSpan.textContent < +rightSpan.textContent) {
            loser = document.querySelector(`#player1Div img[name='${leftSpan.textContent}']`);
            winner = document.querySelector(`#player2Div img[name='${rightSpan.textContent}']`);
         }

         winner.style.border = '2px solid green';
         loser.style.border = '2px solid red';

         document.getElementById('history').textContent += `[${leftSpan.textContent} vs ${rightSpan.textContent}] `;

         [leftSpan.textContent, rightSpan.textContent] = ['', ''];
      }
   }
}
