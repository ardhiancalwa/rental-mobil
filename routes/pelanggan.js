const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggan controller
let pelangganController = require("../controllers/pelangganController")

// call test middleware
let testMiddleware = require("../middlewares/testMiddleware")
let authorization = require("../middlewares/authorization")

// endpoint get data pelanggan
app.get("/", authorization.authorization, pelangganController.getDataPelanggan)

app.post("/find", [authorization.authorization], pelangganController.findPelanggan)

// endpoint add data pelanggan
app.post("/", authorization.authorization, pelangganController.addDataPelanggan)

// endpoint edit data pelanggan
app.put("/:id_pelanggan", authorization.authorization, pelangganController.editDataPelanggan)

// endpoint delete pelanggan
app.delete("/:id_pelanggan", authorization.authorization, pelangganController.deleteDataPelanggan)

module.exports = app