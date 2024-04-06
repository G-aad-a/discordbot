const { EmbedBuilder } = require('discord.js');

module.exports = async (title, description, upvotes, downvotes) => {
    const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .addFields(
                { name: 'Status', value: 'Pending', inline: false },
                { name: 'Upvotes', value: String(upvotes), inline: true },
                { name: 'Downvotes', value: String(downvotes), inline: true }
            )

    return embed;
}