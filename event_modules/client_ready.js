const { Events, ActivityType } = require("discord.js")

module.exports = {
    name: Events.ClientReady,
    once: true,
    run: async (client) => {
        client.user.setPresence({
            activities: [{ name: `Silas højre klunk`, type: ActivityType.Watching }],
        });
        console.log(`${client.user.username} is ready!`)
    }
}