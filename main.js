const { Client, Intents, Collection } = require("discord.js");

const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ],
    partials: ["CHANNEL"]
});

const loadcommands = require("./loader/loadcommands");
const loadEvents = require("./loader/loadEvents");
const config = require("./config");
const loadSlashCommands = require("./loader/loadSlashCommands");
const { log } = require("./utils/logger");

bot.commands = new Collection();

bot.login(config.token);

loadcommands(bot);
loadEvents(bot);

bot.on("ready", async () => {
    await loadSlashCommands(bot);
    console.log("Bot prêt !");
});

bot.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.channel.type === 1) {
        console.log("Message reçu EN DM :", message.content);
    }

    if (message.content === "!test") {
        message.reply("Ça marche en MP !");
    }
});


log("Bot démarré");

process.on("unhandledRejection", err => {
    console.error("Erreur non gérée :", err);
});

