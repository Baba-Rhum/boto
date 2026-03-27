module.exports = (message, cmd) => {
    if (cmd.permission === "Aucune") return true;

    if (!message.member.permissions.has(cmd.permission)) {
        message.reply("❌ Permission refusée.");
        return false;
    }

    return true;
};