const express = require(`express`)
const app = express()

app.use(express.json())

let sewaController = require("../controllers/sewaController")


//end point GET untuk menampilkan data Sewa
app.get("/", sewaController.getSewa)

//end point POST untuk menambah data Sewa
app.post("/", sewaController.addSewa)

//end point PUT untuk mengedit data Sewa
app.put("/:id_sewa", sewaController.updateSewa)

//end point DELETE untuk menghapus data Sewa
app.delete("/:id_sewa", sewaController.deleteSewa)

module.exports = app