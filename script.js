const params = new URLSearchParams(window.location.search);
const table = params.get("table");

const menuData = [
  { name: "Bánh xèo", price: 30000 },
  { name: "Nem lụi", price: 35000 },
  { name: "Bia", price: 20000 },
  { name: "Nước ngọt", price: 15000 }
];

let order = [];

const menuDiv = document.getElementById("menu");

menuData.forEach((m, i) => {

  const div = document.createElement("div");

  div.innerHTML =
    m.name +
    " - " +
    m.price +
    " <button onclick='add(" + i + ")'>+</button>";

  menuDiv.appendChild(div);

});

function add(i) {
  order.push(menuData[i]);
}

function sendOrder() {

  fetch("/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      table: table,
      items: order
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Đã gửi món");
    order = [];
  });

}