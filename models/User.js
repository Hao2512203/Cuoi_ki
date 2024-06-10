const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    full_name: String
})

module.exports = mongoose.model('users', UserSchema)

