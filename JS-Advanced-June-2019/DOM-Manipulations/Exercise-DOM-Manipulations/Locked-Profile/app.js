function lockedProfile() {

   [...document.querySelectorAll(".profile")].forEach((x) => {
      x.addEventListener('click', process);
   });

   function process(event) {

      if (this.children[2].checked) {
         return;
      }

      if (event.target.textContent === 'Hide it') {
         this.children[9].style.display = "none";
         event.target.textContent = "Show more";

      } else if (event.target.textContent === 'Show more') {
         this.children[9].style.display = "block";
         event.target.textContent = "Hide it";
      }
   }
}
