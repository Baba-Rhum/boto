const discord = require("discord.js")

module.exports = {
    name: "delete",
    description: "Supprime n messages",
    permission: "Aucune",
    dm: false,
    options: [
        {
            name: "nombre",
            description: "Nombre de messages à supprimer",
            type: "Integer",
            required: true
        }
    ],
    async run(bot, interaction) {

        const nombre = interaction.options.getInteger("nombre");
        if (!nombre || nombre < 1 || nombre > 100) {
            return interaction.reply({ content: "Choisis un nombre entre 1 et 100.", flags: 64 });
        }
        await interaction.channel.bulkDelete(nombre, true);
        await interaction.reply({ content: `${nombre} messages supprimés !`, flags: 64 });
    }
}