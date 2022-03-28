const express = require(`express`)
const app = express()

app.use(express.json())

const mobilController = require("../controllers/mobilController")

// endpoint get data pelanggan
app.get("/", mobilController.getMobil)

// endpoint add data pelanggan
app.post("/", mobilController.addMobil)

// endpoint edit data pelanggan
app.put("/:id_mobil", mobilController.updateMobil)

// endpoint delete pelanggan
app.delete("/:id_mobil", mobilController.deleteMobil)

module.exports = app