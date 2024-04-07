module.exports = {
    name: 'suggestionVote',
    type: 'button',
    execute: async (interaction) => {
        const fs = require('fs');
        const path = require('path');

        const data = JSON.parse(
            fs.readFileSync(
                path.join(
                    interaction.client.foldersPath,
                    'suggestions/data.json'
                )
            )
        );
        const id = interaction.message.id;
        const guildId = interaction.guild.id;

        const suggestion = data[guildId].suggestions[id];

        if (suggestion.time < Date.now())
            return interaction.reply({
                content: 'This suggestion has expired!',
                ephemeral: true,
            });

        suggestion.upvotes = suggestion.upvotes.filter(
            (user) => user !== interaction.user.id
        );
        suggestion.downvotes = suggestion.downvotes.filter(
            (user) => user !== interaction.user.id
        );

        if (interaction.customId.split(' ')[1] === 'up') {
            suggestion.upvotes.push(interaction.user.id);
            await interaction.reply({ content: 'Upvoted!', ephemeral: true });
        } else {
            suggestion.downvotes.push(interaction.user.id);
            await interaction.reply({ content: 'Downvoted!', ephemeral: true });
        }
        fs.writeFileSync(
            path.join(interaction.client.foldersPath, 'suggestions/data.json'),
            JSON.stringify(data, null, 4)
        );

        const embed = require('../_suggestionEmbed.js');
        const em = await embed(
            suggestion.title,
            suggestion.description,
            suggestion.upvotes.length,
            suggestion.downvotes.length,
            suggestion.time,
            suggestion.status
        );

        const suggestionChannel = data[guildId].suggestionChannel;
        const message = await interaction.client.channels.cache
            .get(suggestionChannel)
            .messages.fetch(id);

        await message.edit({ embeds: [em] });
    },
};
