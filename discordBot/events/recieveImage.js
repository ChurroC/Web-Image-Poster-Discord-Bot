module.exports = {
    name: 'recieveImage',
    async execute(client, res, image, serverId) {
        try {
            if (serverId.match(/[a-z]/i)) return res.send('Send a appropriate Guild ID');
            if (!Buffer.isBuffer(image.buffer)) return res.send('Send an appropriate image');

            const guild = client.guilds.cache.get(serverId)
            if (!(guild)) return res.send(`No guild found, first invite out discord bot to the server. ${client.invite}`);
        
            const databaseGuild = await client.database.guilds.findOne({ guildId: serverId });
            let prefix
            if (databaseGuild) { prefix = databaseGuild.prefix } else { prefix = '!' }
            if (!databaseGuild) {
                return res.send(`You must /setup or ${prefix}setup first with the bot first.`);
            } else if (!databaseGuild.channelPostId) {
                return res.send(`You must /setup or ${prefix}setup first with the bot first.`);
            }

            const channel = guild.channels.cache.get(databaseGuild.channelPostId)
            if (!(channel)) return res.send(`Channel error redo /setup or ${prefix}setup with the bot.`);
            await channel.send({ files: [{ attachment: image.buffer }] })

            res.send('Done')
        } catch (err) {
            res.send(err)
        }
    }
};