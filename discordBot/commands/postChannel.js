//Example of using database and replies
module.exports = {
    name: 'postchannel',
    discription: 'Choose the channel to post images to.',
    async execute(message, args, client) {
        const channel = args[0];
        const channelId = channel.slice(2, -1);

		const userId = message.author.id
        
        if (!channel) return message.reply('You must specify a channel!');
        if (!message.guild.channels.cache.has(channelId)) return message.reply('That channel does not exist!');

		const guild = await client.database.guilds.findOne({ guildId: message.guildId })
		guild.channelPostId = channelId
		const user = guild.users.filter(user => user[0] === userId)
		if (user.length === 0) {
			guild.users.push([userId, channelId])
		} else {
			const userIndex = guild.users.findIndex(user => user[0] === userId)
			guild.users.splice(userIndex, 1, [userId, channelId]);
		}
        guild.save();

        message.reply(`The post channel has been changed to ${channel} for ${message.author}`);
    }
}