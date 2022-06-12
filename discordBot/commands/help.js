//Example of using database and replies
module.exports = {
    name: 'help',
    discription: 'Need help with the bot?',
    async execute(message, args, client) {
        message.reply(`Use /post_channel or ${client.prefix}post_channel to set the channel to post images to.`);
    }
}