const fs = require("fs")

module.exports = async bot =>{

    fs.readdirSync("./commandes").filter(f => f.endsWith(".js")).forEach(async file =>{

        let commands = require(`../commandes/${file}`)
        if(!commands.name || typeof commands.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom!`)
        bot.commands.set(commands.name, commands)
        console.log(`Commande ${file} chargée avec succès !`)
    })
}