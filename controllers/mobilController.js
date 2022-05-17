let modelMobil = require("../models/index").mobil

let path = require("path")
let fs = require("fs")


exports.getMobil = async (request, response) => {
    let dataMobil = await modelMobil.findAll()
    return response.json(dataMobil)
}

exports.findMobil = async (request, response) => {
    let keyword = request.body.keyword

    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    /**
     * query = select * from pelanggan where username like "%keyword%" or
     * pelanggan like "%keyword%"
     */
    let dataMobil = await modelMobil.findAll({
        where: {
            [Op.or]:{
                nomor_mobil: {[Op.like]: `%${keyword}%`},
                merk: {[Op.like]: `%${keyword}%`},
                jenis: {[Op.like]: `%${keyword}%`},
                warna: {[Op.like]: `%${keyword}%`},
                tahun_pembuatan: {[Op.like]: `%${keyword}%`},
            }
        }
    })
    return response.json(dataMobil)
}

exports.addMobil = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }

    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa_per_hari: request.body.biaya_sewa_per_hari,
        image: request.file.filename
    }

    modelMobil.create(dataMobil)
        .then(result => {
            return response.json({
                message: `Data mobil berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.updateMobil = async (request, response) => {
    let idMobil = request.params.id_mobil

    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa_per_hari: request.body.biaya_sewa_per_hari,
        image: request.body.image
    }

    if(request.file) {
        // jika edit menyertakan file gambar
        let mobil = await modelMobil.findOne({where:{id_mobil: idMobil}})
        let oldFileName = mobil.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        //menyisipkan nama file baru ke da,am objek datasiswa
        dataMobil.image = request.file.filename
    }

    modelMobil.update(dataMobil, { where: {id_mobil: idMobil} })
        .then(result => {
            return response.json({
                message: `Data mobil berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.deleteMobil = async(request, response) => {
    let idMobil = request.params.id_mobil

    // ambil dulu data filename yang akan dihapus
    let mobil = await modelMobil.findOne({where: {id_mobil: idMobil}})
    if (mobil) {
        let oldFileName = mobil.image

        // delet file 
        let location = path.join(__dirname,"../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

    modelMobil.destroy({ where: {id_mobil: idMobil} })
        .then(result => {
            return response.json({
                message: `Data mobil berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}