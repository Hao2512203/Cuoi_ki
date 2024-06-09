const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Cuoi_ki')
        console.log("Ket noi thanh cong")
    } catch (error) {
        console.error("ket noi that bai :",error)
        process.exit(1)
    }
}

module.exports = connectDB;