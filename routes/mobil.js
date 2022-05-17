const express = require(`express`)
const app = express()

app.use(express.json())

let mobilController = require("../controllers/mobilController")
let authorization = require("../middlewares/authorization")
let uploadImage = require("../middlewares/uploadImage")

// endpoint get data pelanggan
app.get("/", authorization.authorization, mobilController.getMobil)

app.post("/find", [authorization.authorization], mobilController.findMobil)

// endpoint add data pelanggan
app.post("/", [
    authorization.authorization,
    uploadImage.upload.single(`image`)
], mobilController.addMobil)

// endpoint edit data pelanggan
app.put("/:id_mobil", [
    authorization.authorization,
    uploadImage.upload.single(`image`)
], mobilController.updateMobil)

// endpoint delete pelanggan
app.delete("/:id_mobil", authorization.authorization, mobilController.deleteMobil)

module.exports = app