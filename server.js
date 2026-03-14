const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// thư mục chứa file web
const publicPath = path.join(__dirname);

app.use(express.static(publicPath));

let orders = {};

// trang menu
app.get("/menu.html", (req, res) => {
  res.sendFile(path.join(publicPath, "menu.html"));
});

// trang staff
app.get("/staff.html", (req, res) => {
  res.sendFile(path.join(publicPath, "staff.html"));
});

// gửi order
app.post("/order", (req, res) => {

  const { table, items } = req.body;

  if (!orders[table]) {
    orders[table] = [];
  }

  orders[table] = orders[table].concat(items);

  res.json({ status: "ok" });

});

// danh sách bàn
app.get("/tables", (req, res) => {
  res.json(orders);
});

// món từng bàn
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