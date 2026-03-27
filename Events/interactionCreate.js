module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
        const command = bot.commands.get(interaction.commandName);
        if (!command) return;
        await command.run(bot, interaction);
    }
}