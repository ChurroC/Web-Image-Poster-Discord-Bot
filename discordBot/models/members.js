const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    pingCount: {
        type: String
    }
})

module.exports = {
    cmdName: 'members',
    model: mongoose.model('Members', schema)
}