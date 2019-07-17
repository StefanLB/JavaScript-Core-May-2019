function solve() {
  const table = document.querySelector('tbody');
  document.querySelector('input[type="checkbox"]').disabled = false;

  const [generateTextarea, buyTextarea] = document.getElementsByTagName('textarea');
  const [generateButton, buyButton] = document.getElementsByTagName('button');

  generateButton.addEventListener('click', generateProduct);
  buyButton.addEventListener('click', buyProducts);

  function generateProduct() {
    JSON.parse(generateTextarea.value).forEach((element) => {
      table.innerHTML +=
        `<tr>
            <td><img src="${element.img}"></td>
            <td><p>${element.name}</p></td>
            <td><p>${element.price}</p></td>
            <td><p>${element.decFactor}</p></td>
            <td><input type="checkbox" /></td>   
        </tr>`;
    });
  }

  function buyProducts() {
    const [furniture, price, decoration] = [[], [], []];

    Array.from(document.getElementsByTagName('input')).filter((x) => x.checked).forEach((x) => {
      const inputInfo = Array.from(x.parentNode.parentNode.children).slice(1, -1);

      furniture.push(inputInfo[0].textContent.trim());
      price.push(inputInfo[1].textContent.trim());
      decoration.push(inputInfo[2].textContent.trim());
    });

    const joinedFurniture = furniture.join(', ');
    const totalPrice = price.map(Number).reduce((a, b) => a + b, 0).toFixed(2);
    const averageFactor = decoration.map(Number).reduce((a, b) => a + b, 0) / decoration.length;

    buyTextarea.value =
      `Bought furniture: ${joinedFurniture}\n` +
      `Total price: ${totalPrice}\n` +
      `Average decoration factor: ${averageFactor}`;
  }
}
