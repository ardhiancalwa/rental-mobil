const express =  require(`express`)
const app = express()

app.use(express.json())

let karyawanController = require("../controllers/karyawanController")
let authorization = require("../middlewares/authorization")
const userValidator = require("../middlewares/userValidator")
// endpoint get data pelanggan
app.get("/", authorization.authorization, karyawanController.getKaryawan)

app.post("/find", [authorization.authorization], karyawanController.findUser)

// endpoint add data pelanggan
app.post("/", [userValidator.validate], karyawanController.addKaryawan)

// endpoint edit data pelanggan
app.put("/:id_karyawan", authorization.authorization, karyawanController.updateKaryawan)

// endpoint delete pelanggan
app.delete("/:id_karyawan", authorization.authorization, karyawanController.deleteKaryawan)

app.post("/auth", authorization.authorization, karyawanController.authentication)
module.exports = app