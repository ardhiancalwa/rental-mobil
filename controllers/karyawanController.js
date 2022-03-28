let modelKaryawan = require("../models/index").karyawan
let md5 = require("md5")

exports.getKaryawan = async (request, response) => {
    let dataKaryawan = await modelKaryawan.findAll()
    return response.json(dataKaryawan)
}

exports.addKaryawan = (request, response) => {
    let dataKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak: request.body.kontak,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelKaryawan.create(dataKaryawan)
        .then(result => {
            return response.json({
                message: `Data karyawan berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.updateKaryawan = (request, response) => {
    let params = {
        id_karyawan: request.params.id_karyawan
    }

    let dataKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak: request.body.kontak,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelKaryawan.update(dataKaryawan, { where: params })
        .then(result => {
            return response.json({
                message: `Data karyawan berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.deleteKaryawan = (request, response) => {
    let params = {
        id_karyawan: request.params.id_karyawan
    }

    modelKaryawan.destroy({ where: params })
        .then(result => {
            return response.json({
                message: `Data karyawan berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}