const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let orders = {};

// khách gửi order
app.post("/order", (req, res) => {
  const { table, items } = req.body;

  if (!orders[table]) {
    orders[table] = [];
  }

  orders[table] = orders[table].concat(items);

  res.json({ status: "ok" });
});

// lấy danh sách bàn
app.get("/tables", (req, res) => {
  res.json(orders);
});

// lấy món của bàn
app.get("/table/:id", (req, res) => {
  res.json(orders[req.params.id] || []);
});

// thanh toán
app.post("/pay", (req, res) => {
  delete orders[req.body.table];
  res.json({ status: "paid" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});