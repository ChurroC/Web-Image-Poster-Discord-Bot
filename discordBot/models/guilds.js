const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String
    },
    channelPostId: {
        type: String
    }
})

module.exports = {
    cmdName: 'guilds',
    model: mongoose.model('Guilds', schema)
}