const discord = require("discord.js")

module.exports = {
    name: "stats",
    description: "Statistiques du bot",
    permission: "Aucune",
    dm: true,

    async run(bot, message) {
        const embed = {
            title: "📊 Statistiques du bot",
            color: 0x2ea043,
            fields: [
                { name: "Serveurs", value: `${bot.guilds.cache.size}`, inline: true },
                { name: "Utilisateurs", value: `${bot.users.cache.size}`, inline: true },
                { name: "Ping", value: `${bot.ws.ping} ms`, inline: true }
            ]
        };

        message.reply({ embeds: [embed] });
    }
};