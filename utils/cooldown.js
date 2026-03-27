const cooldowns = new Map();

module.exports = (userId, command, time = 3000) => {
    const key = `${userId}-${command}`;

    if (cooldowns.has(key)) return false;

    cooldowns.set(key, Date.now());

    setTimeout(() => cooldowns.delete(key), time);

    return true;
};