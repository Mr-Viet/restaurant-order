const express = require("express");
const path = require("path");

const app = express();

// cho phép nhận dữ liệu JSON
app.use(express.json());

// cho phép truy cập các file html css js
app.use(express.static(__dirname));


// lưu dữ liệu order tạm
let orders = {};


// mở trang menu khi vào trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});


// khách gửi order
app.post("/order", (req, res) => {

  const table = req.body.table;
  const items = req.body.items;

  if (!orders[table]) {
    orders[table] = [];
  }

  orders[table] = orders[table].concat(items);

  res.json({status:"ok"});
});


// lấy danh sách bàn
app.get("/tables", (req, res) => {
  res.json(orders);
});


// lấy món của từng bàn
app.get("/table/:id", (req, res) => {

  const table = req.params.id;

  res.json(orders[table] || []);
});


// thanh toán bàn
app.post("/pay", (req, res) => {

  const table = req.body.table;

  delete orders[table];

  res.json({status:"paid"});
});


// chạy server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});