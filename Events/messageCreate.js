const discord = require("discord.js")
const { EmbedBuilder, Colors } = require("discord.js");
const { system_prompt, model } = require("../config");
const ChatBot = require("../chatbot/ChatBot");

function clean_message_content(message) {
    if (!message || typeof message.content !== "string") return "";
    return message.content.trim();
}

module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const antiSpam = require("../utils/antiSpam");
    const cooldown = require("../utils/cooldown");
    const checkPerm = require("../middlewares/permissions");
    const { log } = require("../utils/logger");

    // 1. Anti spam global
    const spamResult = antiSpam(message);
    if (spamResult.isSpam) {
        message.author.createDM().then(dm => {
            dm.send("🚫 Tu es en cooldown global à cause de spam. Attends un peu avant de réessayer.");
        });

        if (message.member) {
            message.member.timeout(10 * 60 * 1000, "Spam détecté").catch(err => {
                console.error("Timeout impossible :", err);
                message.channel.send("⚠️ Je n'ai pas pu mute ce membre (permissions/hiérarchie insuffisantes).");
            });
        }

        // Supprime tous les messages stockés par antiSpam (flood des 5+ messages)
        for (const msgId of spamResult.messageIds) {
            message.channel.messages.fetch(msgId)
                .then(m => m.delete().catch(() => {}))
                .catch(() => {});
        }

        return console.log("Spam détecté de", message.author.tag);

    }

    // 2. Mention du bot (IA)
    if (message.mentions.users.has(bot.user.id)) {
        try {
            const chatBot = new ChatBot();
            const conversationId = message.channel.id; // Use channel as conversation
            const userMessage = clean_message_content(message);

            const response = await chatBot.sendConv(conversationId, userMessage);
            await message.reply(response);
        } catch (error) {
            console.error("Erreur IA :", error);
            await message.reply("❌ Erreur lors de la génération de la réponse IA.");
        }
        return;
    }

    let prefix = "/";
    if (!message.content.startsWith(prefix)) return;
    
    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);


    const cmd = bot.commands.get(commandName);
    if (!cmd) return;

    // 3. Cooldown (par commande)
    if (!cooldown(message.author.id, cmd.name)) {
        return message.reply("⏳ Attends avant de réutiliser cette commande.");
    }

    // 4. Permissions
    if (!checkPerm(message, cmd)) return;

    // 5. Log
    log(`${message.author.tag} a utilisé ${cmd.name}`);

    // 6. Exécution
    try {
        await cmd.run(bot, message, args);
    } catch (err) {
        console.error(err);
        message.reply("❌ Erreur.");
    }
    
    if (!message.content.startsWith(prefix)) return;


    let commands;
    try {
        commands = require(`../commandes/${commandName}`);
    } catch (e) {
        return message.reply("Il n'y as pas de commande !");
    }
    if (!commands) return message.reply("Il n'y as pas de commande !");

    commands.run(bot, message, args);


}