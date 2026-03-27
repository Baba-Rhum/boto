const discord = require("discord.js")

module.exports = {

    name: "help",
    description: "Affiche les commandes existantes",
    permission: "Aucune",
    dm: true,

    async run(bot, messageOrInteraction) {

        const helpEmbed = new discord.MessageEmbed()
            .setColor(0x5865F2)
            .setTitle('📖 Liste des commandes disponibles')
            .setDescription('Voici toutes les commandes que tu peux utiliser avec ce bot :')
            .setFooter('💡 Astuce : les commandes commencent par /')
            .setTimestamp();

        bot.commands.forEach(cmd => {
            helpEmbed.addField(`/${cmd.name}`, cmd.description || "Pas de description", false);
        });

        // Vérifier si c'est une interaction (slash command) ou un message
        if (messageOrInteraction.reply && typeof messageOrInteraction.reply === 'function' && messageOrInteraction.isCommand && messageOrInteraction.isCommand()) {
            // C'est une interaction slash
            await messageOrInteraction.reply({ embeds: [helpEmbed] });
        } else {
            // C'est un message
            await messageOrInteraction.channel.send({ embeds: [helpEmbed] });
        }
    }

}