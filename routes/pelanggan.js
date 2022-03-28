const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggan controller
let pelangganController = require("../controllers/pelangganController")

// endpoint get data pelanggan
app.get("/", pelangganController.getDataPelanggan)

// endpoint add data pelanggan
app.post("/", pelangganController.addDataPelanggan)

// endpoint edit data pelanggan
app.put("/:id_pelanggan", pelangganController.editDataPelanggan)

// endpoint delete pelanggan
app.delete("/:id_pelanggan", pelangganController.deleteDataPelanggan)

module.exports = app