const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static("public"))

let orders = {}

app.post("/order",(req,res)=>{

const {table,items} = req.body

orders[table] = items

res.json({status:"ok"})

})

app.get("/tables",(req,res)=>{

res.json(orders)

})

app.get("/table/:id",(req,res)=>{

res.json(orders[req.params.id] || [])

})

app.post("/pay",(req,res)=>{

delete orders[req.body.table]

res.json({status:"paid"})

})

app.listen(3000,()=>{

console.log("Server running on port 3000")

})