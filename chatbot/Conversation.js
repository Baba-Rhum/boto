const { MessageInputEntry, Role, MessageOutputEntry } = require("@mistralai/mistralai/models/components");

class Conversation {
    constructor() {
        this.conversations = new Set();
        this.totalTokens = 0;
        this.maxTokens = 1000;
    }

    get() {
        const convs = [];
        for (const conversation of this.conversations) {
            const role = conversation.role ?? Role.User;
            const content = conversation.content;
            const conv = { role, content };

            convs.push(conv);
        }
        return convs;
    }

    append(input) {
        this.conversations.add(input);
        if (this.totalTokens > this.maxTokens) {
            this.deleteFirstConv();
        }
    }

    deleteFirstConv() {
        const conv = [...this.conversations].shift();
        if (!conv) return;

        this.conversations.delete(conv);
    }
}

module.exports = Conversation;