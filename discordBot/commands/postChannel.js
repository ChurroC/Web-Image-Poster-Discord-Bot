//Example of using database and replies
module.exports = {
    name: 'postchannel',
    discription: 'Choose the channel to post images to.',
    async execute(message, args, client) {
        const channel = args[0];
        const channelId = channel.slice(2, -1);
        
        if (!channel) return message.reply('You must specify a channel!');
        if (!message.guild.channels.cache.has(channelId)) return message.reply('That channel does not exist!');
        
        const guild = await client.database.guilds.findOneAndUpdate({ guildId: message.guildId }, { channelPostId: channelId })
        guild.save();

        message.reply(`The post channel has been changed to channel`);
    }
}