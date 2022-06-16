module.exports = {
    name: 'recieveImage',
    async execute(client, res, image, serverId, userId) {
        try {
            if (serverId.match(/[a-z]/i)) return res.status(400).send('Send a appropriate Guild ID');
            if (userId.match(/[a-z]/i)) return res.status(400).send('Send a appropriate User ID');
			
			if (!image) return res.status(400).send('Send an appropriate image');
			if (!userId) return res.status(400).send('Send an appropriate userID');

            const guild = client.guilds.cache.get(serverId)
            if (!(guild)) return res.status(400).send(`No guild found, first invite out discord bot to the server: ${client.invite}`);
			const user = guild.members.cache.get(userId)
            if (!(user)) {
				const fetchUser = await guild.members.fetch(userId)
				if (!fetchUser) return res.status(400).send(`No user found, make sure your in the discord server or you have the correct user id`);
			} 
        
            const databaseGuild = await client.database.guilds.findOne({ guildId: serverId });
            let prefix
            databaseGuild ? prefix = databaseGuild.prefix : prefix = '!' 
            if (!databaseGuild) {
                return res.status(400).send(`You must /setup or ${prefix}setup first with the bot first`);
            }
			
			const userGuild = databaseGuild.users.filter(user => user[0] === userId)
			if (userGuild.length === 0) return res.status(400).send(`You must /setup or ${prefix}setup first with the bot first`);

            const channel = guild.channels.cache.get(userGuild[0][1])
            if (!(channel)) return res.status(400).send(`Channel error redo /setup or ${prefix}setup with the bot`);
			
			if (image.slice(0, 22) === 'data:image/png;base64,') {
				image = new Buffer.from(image.slice(22,image.length), 'base64')
            	await channel.send({ files: [{ attachment: image }] })
			} else if (image.slice(0, 23) === 'data:image/jpeg;base64,') {
				image = new Buffer.from(image.slice(23,image.length), 'base64')
            	await channel.send({ files: [{ attachment: image }] })
			} else {
            	await channel.send(image)
			}
            res.status(200).send('Finished Posting')
        } catch (err) {
            res.status(500).send(String(err))
        }
    }
};