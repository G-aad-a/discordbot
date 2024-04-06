const { EmbedBuilder } = require('discord.js');

module.exports = async (title, description, upvotes, downvotes, time) => {
    const timeLeft = time - Date.now();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .addFields(
                { name: 'Status', value: 'Pending', inline: false },
                { name: 'Upvotes', value: String(upvotes), inline: true },
                { name: 'Downvotes', value: String(downvotes), inline: true },
                { name: 'Time left', value: `${days} days, ${hours} hours, ${minutes} minutes`, inline: false }
            );

    return embed;
}