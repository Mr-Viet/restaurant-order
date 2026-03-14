const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Phục vụ các file tĩnh (menu.html, staff.html, style.css, script.js...)
app.use(express.static(path.join(__dirname)));

// ====== Dữ liệu tạm (trong RAM) ======
let orders = {};

// Khách gửi order
app.post("/order", (req, res) => {
  const { table, items } = req.body;

  if (!orders[table]) orders[table] = [];
  orders[table] = orders[table].concat(items);

  res.json({ status: "ok" });
});

// Lấy tất cả bàn
app.get("/tables", (req, res) => {
  res.json(orders);
});

// Lấy món của 1 bàn
app.get("/table/:id", (req, res) => {
  res.json(orders[req.params.id] || []);
});

// Thanh toán
app.post("/pay", (req, res) => {
  delete orders[req.body.table];
  res.json({ status: "paid" });
});

// ====== Chạy server ======
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});