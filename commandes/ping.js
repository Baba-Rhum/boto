const discord = require("discord.js")

module.exports = {

    name: "ping",
    description : "Affiche la latence",
    permission: "Aucune",
    dm: true,
    
    async run(bot, message){
        
        await message.reply(`Ping : \`${bot.ws.ping}\`, Pong!`)
    }
    
}