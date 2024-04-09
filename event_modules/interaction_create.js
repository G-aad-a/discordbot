const { Events } = require("discord.js")
const path = require('path')
const eventHandler = require(path.join(__dirname, '../event_handlers/event_handler.js'))

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    run: async (client, interaction) => {
        eventHandler(interaction)
    }
}