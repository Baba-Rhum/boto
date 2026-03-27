const discord = require("discord.js")
const { EmbedBuilder, Colors } = require("discord.js");



const quoi = [];
const ethic = []
const tg = []
const sergiu = []
const video_raciste = [];
/*
const quoi = ["quoi", "kwa", "qwa", "qoua", "koua"];
const ethic = ["ethic", "loi", "law", "low", "rules", "règle", "nique", "mère", "mere", "gueule"]
const tg = ["tg", "noir", "gay", "pd"]
const sergiu = ["roumain", "sergiu"]
const video_raciste = [
    "https://www.youtube.com/watch?v=Z0DO0XyS8Ko&list=RDZ0DO0XyS8Ko&start_radio=1&pp=ygUJcGUgY2ltcG9poAcB"
];*/
const discours = [
      "Chat Control est une abomination, une arme de surveillance de masse déguisée en dispositif de “protection”. C’est la mort programmée de notre vie privée. Autoriser les autorités à scanner chaque mot, chaque image, chaque pensée échangée, c’est abandonner notre dignité humaine. Le chiffrement est notre dernier refuge contre l’intrusion étatique. Ils veulent le briser pour transformer chaque citoyen en suspect permanent.Ceux qui défendent le Chat Control veulent fabriquer une société de peur où la confiance n’existe plus. Sous prétexte de sécurité, ils imposent une dictature numérique déguisée. Accepter ce système, c’est accepter d’être surveillés comme du bétail. Aujourd’hui ils scannent nos messages, demain ils dicteront ce qu’on a le droit de dire, penser ou ressentir.Refuser le Chat Control, ce n’est pas soutenir les criminels — c’est protéger la liberté fondamentale de tous. La confidentialité n’est pas un privilège, c’est un droit humain sacré. Nous devons nous opposer avec une détermination inébranlable à toute tentative de réduire la sphère privée à un espace contrôlé par des algorithmes et des bureaucrates. La liberté ne se négocie pas. Elle se défend, coûte que coûte.",
      "Il est temps d’arrêter cette hypocrisie autour de la soi-disant “liberté numérique”. Chaque jour, des criminels, des terroristes et des prédateurs se cachent derrière le voile de la confidentialité. Ils utilisent les messageries chiffrées comme des armes invisibles, et nous, citoyens honnêtes, sommes censés accepter cela au nom d’une liberté abstraite ? Non. Le Chat Control est une nécessité absolue. Il représente le dernier rempart de la société civilisée face au chaos de l’anonymat incontrôlé. Ceux qui s’opposent à ce système protègent indirectement les pires individus. Ils préfèrent défendre un principe idéalisé plutôt que la sécurité réelle des enfants, des innocents et de la majorité silencieuse. Nous devons tout surveiller, sans exception, car la seule façon de garantir la paix est d’avoir une transparence totale. Le contrôle des communications n’est pas une atteinte à la liberté : c’est une purification du numérique. Si quelqu’un n’a rien à cacher, il n’a rien à craindre. Seuls les coupables tremblent lorsque la lumière se fait. Le Chat Control doit devenir universel, imposé, inévitable. C’est un devoir moral et social de tout gouvernement responsable.",
      "J'espère que tu passes une bonne journée ! 🌞",
      "Besoin d'aide ? Je suis là 🤖",
      "Hello world ! 🌍",
      "Les noirs et les arabes nous...",
      "Aujourd'hui les homosexuel sont...",
      "Je pense qu'en france la droite est la solution à....",
      "@giganotosorus je te passe la flamme",
      "Tu est une bien belle salope"

    ];


module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const antiSpam = require("../utils/antiSpam");
    const cooldown = require("../utils/cooldown");
    const checkPerm = require("../middlewares/permissions");
    const { log } = require("../utils/logger");

    // 1. Anti spam global
    if (antiSpam(message.author.id)) {
        return message.reply("🚫 Spam détecté.");
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


    if (quoi.some(mot => message.content.toLowerCase().includes(mot))) {
        message.react('🇫');
        message.react('🇪');
        message.react('🇺');
        message.react('🇷');
        console.log("Quoi détécté")
        message.channel.send("||f||||e||||u||||r||")

       
    }
    if (ethic.some(mot => message.content.toLowerCase().includes(mot))) {
        message.react('🇴');
        message.react('🇰');
        message.react('🇦');
        message.react('🇾');

        const debut = "Bonjour je vois que tu m'as demander mon avis sur la question et ";

        const randomMessage = discours[Math.floor(Math.random() * discours.length)];

        const final = debut + randomMessage
        message.channel.send(final)
    }
    if (tg.some(mot => message.content.toLowerCase().includes(mot))) {
        message.react('🇳');
        message.react('🇴');
        message.react('🇮');
        message.react('🇷');
        
    }
    if (sergiu.some(mot => message.content.toLowerCase().includes(mot))) {
        message.react('🇷');
        message.react('🇴');
        message.react('🇺');
        message.react('🇲');
        message.react('🇦');
        message.react('🇮');
        message.react('🇳');
          
        const randomLien = video_raciste[Math.floor(Math.random() * video_raciste.length)];

        const embed = new EmbedBuilder()
            .setDescription(`J'ai bien compris que tu voulait parler de la [roumanie](${randomLien}) !`)
            .setColor(Colors.Blue);

        message.channel.send({ embeds: [embed] });
        
    }
    if (message.author.id === "603897205673426965") {
        console.log(`${message.author.username} a envoyé : ${message.content}`);

        message.react('🇷');
        message.react('🇴');
        message.react('🇺');
        message.react('🇲');
        message.react('🇦');
        message.react('🇮');
        message.react('🇳');
        const randomLien = video_raciste[Math.floor(Math.random() * video_raciste.length)];

        const embed = new EmbedBuilder()
            .setDescription(`voila ton [pays](${randomLien}) !`)
            .setColor(Colors.DarkGold);

        message.channel.send({ embeds: [embed] });


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