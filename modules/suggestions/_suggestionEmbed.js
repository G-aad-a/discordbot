const { EmbedBuilder } = require('discord.js');

module.exports = async (
    title,
    description,
    upvotes,
    downvotes,
    time,
    status
) => {
    const timeLeft = time - Date.now();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    let time_value = `${days} days, ${hours} hours, ${minutes} minutes`;
    if (status === 'done') {
        time_value = 'Ended: ' + new Date(time).toLocaleString('da-DK');
    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .addFields(
            { name: 'Status', value: String(status), inline: false },
            { name: 'Upvotes', value: String(upvotes), inline: true },
            { name: 'Downvotes', value: String(downvotes), inline: true },
            { name: 'Time left', value: time_value, inline: false }
        );

    return embed;
};
