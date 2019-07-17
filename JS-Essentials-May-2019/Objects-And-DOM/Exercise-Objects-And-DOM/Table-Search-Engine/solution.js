function solve() {
   const tdList = [];

   Array.from(document.querySelectorAll('tbody tr td')).forEach((x) => tdList.push(x));
   Array.from(document.querySelectorAll('tbody tr td')).forEach((x, i) => x.setAttribute('id', i));
   document.getElementById('searchBtn').addEventListener('click', markLine);

   function markLine() {
      Array.from(document.querySelectorAll('tbody tr')).forEach((x) => x.removeAttribute('class'));
      const query = document.getElementById('searchField').value.toLowerCase();

      if (query.length === 0) {
         return;
      }

      tdList.filter((x) => x.textContent.toLowerCase().includes(query))
         .forEach((x) => tdList[x.id].parentElement.setAttribute('class', 'select'));
      query.value = '';
   }
}
