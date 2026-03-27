const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const config = require("../config")

module.exports = async bot =>{

    let commands = [];

    bot.commands.forEach(command =>{
        
        let slashcommands = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDefaultPermission(command.permission === "Aucune" ? true : true)

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                const opt = command.options[i];
                if (opt.type === "Integer") {
                    slashcommands.addIntegerOption(option =>
                        option.setName(opt.name)
                            .setDescription(opt.description)
                            .setRequired(Boolean(opt.required))
                    );
                }
            }
        }

        commands.push(slashcommands.toJSON())

    })

    const rest = new REST({ version: "9" }).setToken(config.token)

    if (config.guildId) {
        await rest.put(Routes.applicationGuildCommands(bot.user.id, config.guildId), { body: commands })
        console.log("Les slash commandes sont créées avec succès (guild) !")
    } else {
        await rest.put(Routes.applicationCommands(bot.user.id), { body: commands })
        console.log("Les slash commandes sont créées avec succès (global) !")
    }
}