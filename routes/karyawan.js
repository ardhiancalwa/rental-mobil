const express =  require(`express`)
const app = express()

app.use(express.json())

const karyawanController = require("../controllers/karyawanController")

// endpoint get data pelanggan
app.get("/", karyawanController.getKaryawan)

// endpoint add data pelanggan
app.post("/", karyawanController.addKaryawan)

// endpoint edit data pelanggan
app.put("/:id_karyawan", karyawanController.updateKaryawan)

// endpoint delete pelanggan
app.delete("/:id_karyawan", karyawanController.deleteKaryawan)

module.exports = app