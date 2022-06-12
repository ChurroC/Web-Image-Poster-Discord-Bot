const { SlashCommandBuilder } = require('@discordjs/builders')

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('post_channel')
        .setDescription('Choose the channel to post images to.')
        .addChannelOption(channel =>
            channel.setName('post_channel')
                .setDescription('The new post channel for the guild.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('post_channel');
        const channelId = channel.id
        
        if (interaction.guild.channels.cache.get(channelId).type === 'GUILD_CATEGORY') return interaction.reply('That is a category not a channel!');

        const guild = await client.database.guilds.findOneAndUpdate({ guildId: interaction.guildId }, { channelPostId: channelId })
        guild.save();

        interaction.reply(`The post channel has been changed to ${channel}`);
    }
}