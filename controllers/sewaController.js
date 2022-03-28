let sewaModel = require("../models/index").sewa
let mobilModel = require("../models/index").mobil

exports.getSewa = async (request, response) => {
    // variabel async digunakan ketika memakai await
    let data_sewa = await sewaModel.findAll({
        include: [
            "pelanggan",
            "karyawan",
            "mobil"
        ],
    }); //biasanya menggunakan seperti inti hanya untuk get
    return response.json({
        Count: data_sewa.length,
        sewa: data_sewa,
    });
}

exports.addSewa = async(request, response) => {
    let mobil = await mobilModel.findOne({
        where : {id_mobil: request.body.id_mobil}
    })
    let biayaSewa = mobil.biaya_sewa
    let tgl_kembali = new Date(request.body.tgl_kembali)
    let tgl_sewa = new Date(request.body.tgl_sewa)

    var dif = tgl_kembali.getTime() - tgl_sewa.getTime()
    var dif2 = dif/(1000*3600*24)

    let totalBayar = dif2 * biayaSewa
    // tampung data request
    let newSewa = {
        id_mobil : request.body.id_mobil,
        id_karyawan : request.body.id_karyawan,
        id_pelanggan : request.body.id_pelanggan,
        tgl_sewa : request.body.tgl_sewa,
        tgl_kembali : request.body.tgl_kembali,
        total_bayar :totalBayar
    }


    sewaModel.create(newSewa)
    .then(result => {
        return response.json({
            message : `Data has been inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.updateSewa = (request, response) => {
    let id_sewa = request.params.id_sewa
    let data_sewa = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: request.body.total_bayar
    }
    // eksekusi 
    modelSewa.update(data_sewa, { where: { id_sewa: id_sewa } })
        .then(result => {
            return response.json({
                message: `Data sewa telah diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.deleteSewa = (request, response) => {
    let params = {
        id_sewa: request.params.id_sewa
    }

    modelMobil.destroy({ where: params })
        .then(result => {
            return response.json({
                message: `Data sewa berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}