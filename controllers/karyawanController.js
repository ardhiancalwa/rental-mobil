let modelKaryawan = require("../models/index").karyawan
let md5 = require("md5")
let jwt = require(`jsonwebtoken`)

const {validationResult} = require(`express-validator`)

exports.getKaryawan = async (request, response) => {
    let dataKaryawan = await modelKaryawan.findAll()
    return response.json(dataKaryawan)
}

exports.findUser = async (request, response) => {
    let keyword = request.body.keyword

    /** import sequelize operator */
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op
    /**
     * query = select * from user where username like "%keyword%" or
     * name_user like "%keyword%"
     */
    let dataKaryawan = await modelKaryawan.findAll({
        where: {
            [Op.or] : {
                username: {[Op.like]: `%${keyword}%`},
                nama_karyawan: {[Op.like]: `%${keyword}%`}
            }
        }
    })
    return response.json(dataKaryawan)
}

exports.addKaryawan = (request, response) => {
    let error = validationResult(request)
    if (!error.isEmpty()) {
        return response.json(error.array())
    }
    
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
exports.authentication = async(request, response) => {
    let data = {
        username : request.body.username,
        password : md5(request.body.password)
    }

    // validasi
    let result = await modelKaryawan.findOne({where : data})

    if (result) {
        // data ditemukan

        // payload adalah data yang akan dienkripsi
        let payload = JSON.stringify(result) // untuk mengubah data objek ke json

        let secretKey = `Rental Mobil`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token
        })
    } else {
        // data tidak ditemukan
        return response.json({
            logged: false,
            message : `Invalid Username or Password, Please Try Again!`
        })
    }
}