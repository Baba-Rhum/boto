const discord = require("discord.js")
const { EmbedBuilder, Colors } = require("discord.js");
const { system_prompt, model } = require("../config");

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
        const fetchedMessages = await message.channel.messages.fetch({ limit: 5 });
        console.log("bot mentionné");

        const sortedMessages = Array.from(fetchedMessages.values()).sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        const messages = [];
        for (const m of sortedMessages) {
            const role = m.author.id === bot.user.id ? "assistant" : "user";
            const content = clean_message_content(m);
            messages.push({ role, content });
        }

        const prompt = typeof system_prompt === "string" && system_prompt.length > 0
            ? system_prompt
            : "You are a helpful assistant.";

        messages.unshift({ role: "system", content: prompt });

        const selectedModel = typeof model === "string" && model.length > 0 ? model : "gpt-4o-mini";

        const mistralClient = bot.client_mistral;
        if (!mistralClient) {
            console.error("client_mistral non défini sur bot. Veuillez initialiser dans main.js");
            return message.reply("❌ Erreur interne : client IA non disponible.");
        }

        const response = await mistralClient.chat.complete({
            model: selectedModel,
            messages: messages,
            maxTokens: 256
        });

        const response_content = response.choices[0]?.message?.content || "Désolé, je n’ai pas pu générer de réponse.";
        await message.reply(response_content);
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