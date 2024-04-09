const { Events } = require("discord.js")
const path = require('path')
const reponses = require(path.join(__dirname, '../response.js'))

module.exports = {
    name: Events.MessageCreate,
    once: false,
    run: async (client, message) => {
        const content = message.content.toLowerCase()
        const author = message.author

        if (author.bot) return

        for(const response of reponses) {
            if (content.includes(response.trigger)) {
                message.reply(response.response)
            }
        }
    }
}