const express = require(`express`)
const app = express()
const PORT = 8000

let routes = [
    { prefix: `/pelanggan`, route: require('./routes/pelanggan') },
    { prefix: `/karyawan`, route: require('./routes/karyawan') },
    { prefix: `/mobil`, route: require('./routes/mobil') },
    { prefix: `/sewa`, route: require(`./routes/sewa`) }
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)

}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})