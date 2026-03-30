const spamMap = new Map();

const WINDOW_MS = 2 * 60 * 1000; // 2 minutes
const THRESHOLD = 5; // 5 messages

module.exports = (message) => {
    const userId = message.author.id;
    const now = Date.now();

    let record = spamMap.get(userId) || { timestamps: [], messageIds: [] };

    // ajout du nouveau message
    record.timestamps.push(now);
    record.messageIds.push(message.id);

    // nettoyage des messages hors fenêtre 2 minutes
    while (record.timestamps.length > 0 && now - record.timestamps[0] > WINDOW_MS) {
        record.timestamps.shift();
        record.messageIds.shift();
    }

    spamMap.set(userId, record);

    if (record.timestamps.length >= THRESHOLD) {
        const messageIds = [...record.messageIds];
        spamMap.delete(userId);
        return { isSpam: true, messageIds };
    }

    return { isSpam: false };
};