let modelMobil = require("../models/index").mobil

exports.getMobil = async (request, response) => {
    let dataMobil = await modelMobil.findAll()
    return response.json(dataMobil)
}

exports.addMobil = (request, response) => {
    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan
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

exports.updateMobil = (request, response) => {
    let params = {
        id_mobil: request.params.id_mobil
    }

    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa_per_hari: request.body.biaya_sewa_per_hari,
        image: request.body.image
    }

    modelMobil.update(dataMobil, { where: params })
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

exports.deleteMobil = (request, response) => {
    let params = {
        id_mobil: request.params.id_mobil
    }

    modelMobil.destroy({ where: params })
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