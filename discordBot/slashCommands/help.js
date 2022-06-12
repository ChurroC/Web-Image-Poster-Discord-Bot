const { SlashCommandBuilder } = require('@discordjs/builders')

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Need help with the bot?'),
    async execute(interaction, client) {
        await interaction.reply(`Use /post_channel or ${client.prefix}post_channel to set the channel to post images to.`)
    }
}