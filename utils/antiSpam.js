const spamMap = new Map();

module.exports = (userId) => {
    if (!spamMap.has(userId)) {
        spamMap.set(userId, 1);
        setTimeout(() => spamMap.delete(userId), 5000);
        return false;
    }

    let count = spamMap.get(userId);
    spamMap.set(userId, count + 1);

    return count > 5;
};