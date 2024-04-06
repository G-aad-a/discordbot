module.exports = {
    name: 'suggestionVote',
    type: 'button',
    execute: async (interaction) => {
        const fs = require('fs');
        const path = require('path');

        const data = JSON.parse(fs.readFileSync(path.join(interaction.client.foldersPath,'suggestions/data.json')));
        const id = interaction.customId.split(' ')[1];
        const guildId = interaction.guild.id;
        
        data[guildId].suggestions[id].upvotes = data[guildId].suggestions[id].upvotes.filter(user => user !== interaction.user.id);
        data[guildId].suggestions[id].downvotes = data[guildId].suggestions[id].downvotes.filter(user => user !== interaction.user.id);
        if (interaction.customId.split(' ')[2] === 'up') {
            data[guildId].suggestions[id].upvotes.push(interaction.user.id);
            await interaction.reply({ content: 'Upvoted!', ephemeral: true });
        } else {
            data[guildId].suggestions[id].downvotes.push(interaction.user.id);
            await interaction.reply({ content: 'Downvoted!', ephemeral: true });
        }
        fs.writeFileSync(path.join(interaction.client.foldersPath, 'suggestions/data.json'), JSON.stringify(data, null, 4));

    }
};