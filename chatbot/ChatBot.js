const { ConversationResponse, MessageOutputEntry, Role } = require('@mistralai/mistralai/models/components');
import { Mistral } from '@mistralai/mistralai';
const Conversation = require('./Conversation');
const { api_key, agent_id, model } = require('../config');

class ChatBot {

    constructor() {
        this.apiKey = api_key;
        this.agentId = agent_id;
        this.model = model;
        this.client = new Mistral({ apiKey: this.apiKey });
        this.conversations = new Map();
    }

    getConversation(conversation) {
        return this.conversations.get(conversation) ?? this.createConv(conversation);
    }

    createConv(conversation) {
        const conv = new Conversation();
        this.conversations.set(conversation, conv);
        return conv;
    }

    deleteConv(conversation) {
        this.conversations.delete(conversation);
    }

    async sendConv(conversation, message) {
        const conv = this.getConversation(conversation);
        conv.append({ role: Role.User, content: message });

        const response = await this.client.chat.complete({
            model: this.model,
            messages: conv.get(),
            maxTokens: 256
        });

        const response_content = response.choices[0].message.content;
        conv.append({ role: Role.Assistant, content: response_content });

        conv.totalTokens = response.usage.totalTokens ?? 0;

        return response_content;
    }
}

module.exports = ChatBot;