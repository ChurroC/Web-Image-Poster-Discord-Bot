module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
		if (!interaction.guild.prefix){ // Load prefix into cache 
            const guild = await client.database.guilds.findOne({ guildId: interaction.guildId });
            if (guild) {
                interaction.guild.prefix = guild.prefix;
            } else {
                const newGuild = await client.database.guilds.create({ guildId: interaction.guildId, prefix: '!' })
                await newGuild.save();
                interaction.guild.prefix = '!';
            }
        }
		
        if (!interaction.isCommand()) return;

        const command =  client.slashCommands.get(interaction.commandName);
        if (!command) return;
    
        try {
            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: 'There was an error trying to execute that command!',
                ephemeral: true
            });
        }
    }
};