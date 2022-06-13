module.exports = {
    name: 'recieveImage',
    async execute(client, res, image, serverId) {
        try {
            if (serverId.match(/[a-z]/i)) return res.status(400).send('Send a appropriate Guild ID');
			
			if (!image) return res.status(400).send('Send an appropriate image');

            const guild = client.guilds.cache.get(serverId)
            if (!(guild)) return res.status(400).send(`No guild found, first invite out discord bot to the server. ${client.invite}`);
        
            const databaseGuild = await client.database.guilds.findOne({ guildId: serverId });
            let prefix
            if (databaseGuild) { prefix = databaseGuild.prefix } else { prefix = '!' }
            if (!databaseGuild) {
                return res.status(400).send(`You must /setup or ${prefix}setup first with the bot first.`);
            } else if (!databaseGuild.channelPostId) {
                return res.status(400).send(`You must /setup or ${prefix}setup first with the bot first.`);
            }

            const channel = guild.channels.cache.get(databaseGuild.channelPostId)
            if (!(channel)) return res.send(`Channel error redo /setup or ${prefix}setup with the bot.`);
			
			if (image.slice(0, 22) === 'data:image/png;base64,') {
				image = new Buffer.from(image.slice(22,image.length), 'base64')
			}
            await channel.send({ files: [{ attachment: image }] })

            res.status(200).send('Done')
        } catch (err) {
            res.send(err)
        }
    }
};