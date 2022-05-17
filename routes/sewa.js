const express = require(`express`)
const app = express()

app.use(express.json())

let sewaController = require("../controllers/sewaController")
let authorization = require("../middlewares/authorization")


//end point GET untuk menampilkan data Sewa
app.get("/", authorization.authorization, sewaController.getSewa)

app.post("/find", [authorization.authorization], sewaController.findSewa)

//end point POST untuk menambah data Sewa
app.post("/", authorization.authorization, sewaController.addSewa)

//end point PUT untuk mengedit data Sewa
app.put("/:id_sewa", authorization.authorization, sewaController.updateSewa)

//end point DELETE untuk menghapus data Sewa
app.delete("/:id_sewa", authorization.authorization, sewaController.deleteSewa)

module.exports = app 