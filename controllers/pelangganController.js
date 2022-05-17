// memanggil file model untuk pelanggan
let modelPelanggan = require("../models/index").pelanggan

exports.getDataPelanggan = (request, response) => {
    modelPelanggan.findAll()
        .then(result => {
            return response.json(result)
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.findPelanggan = async (request, response) => {
    let keyword = request.body.keyword

    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    /**
     * query = select * from pelanggan where username like "%keyword%" or
     * pelanggan like "%keyword%"
     */
    let dataPelanggan = await modelPelanggan.findAll({
        where: {
            [Op.or]:{
                nama_pelanggan: {[Op.like]: `%${keyword}%`},
                alamat_pelanggan: {[Op.like]: `%${keyword}%`},
                kontak: {[Op.like]: `%${keyword}%`}``
            }
        }
    })
    return response.json(dataPelanggan)
}

exports.addDataPelanggan = (request, response) => {
    // tampung data request
    let newPelanggan = {
        nama_pelanggan: request.body.nama_pelanggan,
        alamat_pelanggan: request.body.alamat_pelanggan,
        kontak: request.body.kontak
    }

    modelPelanggan.create(newPelanggan)
        .then(result => {
            return response.json({
                message: `Data pelanggan berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.editDataPelanggan = (request, response) => {
    let id = request.params.id_pelanggan
    let dataPelanggan = {
        nama_pelanggan: request.body.nama_pelanggan,
        alamat_pelanggan: request.body.alamat_pelanggan,
        kontak: request.body.kontak
    }

    modelPelanggan.update(dataPelanggan, { where: { id_pelanggan: id } })
        .then(result => {
            return response.json({
                message: `Data pelanggan berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })

}

exports.deleteDataPelanggan = (request, response) => {
    let id = request.params.id_pelanggan

    modelPelanggan.destroy({ where: { id_pelanggan: id } })
        .then(result => {
            return response.json({
                message: `Data pelanggan berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}