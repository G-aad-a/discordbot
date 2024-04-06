const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'suggestionModal',
    type: 'modal',
    async execute(interaction) {

        const fs = require('fs');
        const path = require('path');
        const data = JSON.parse(fs.readFileSync(path.join(interaction.client.foldersPath,'suggestions/data.json')));
        if (!data[interaction.guild.id]) {
            await interaction.reply({ content: 'Please set the suggestion channel first using /setchannel!', ephemeral: true });
            return;
        }

        id = Date.now();
        suggestionChannel = data[interaction.guild.id].suggestionChannel;

        data[interaction.guild.id].suggestions[id] = {
            title: interaction.fields.getTextInputValue("titleInput"),
            description: interaction.fields.getTextInputValue("descriptionInput"),
            upvotes: [],
            downvotes: []
        };

        fs.writeFileSync(path.join(interaction.client.foldersPath, 'suggestions/data.json'), JSON.stringify(data, null, 4));

        const embed = new EmbedBuilder()
            .setTitle(interaction.fields.getTextInputValue("titleInput"))
            .setDescription(interaction.fields.getTextInputValue("descriptionInput"))

        const thumbsUpButton = new ButtonBuilder()
            .setCustomId('suggestionVote ' + id + ' up')
            .setLabel('👍')
            .setStyle(ButtonStyle.Primary);

        const thumbsDownButton = new ButtonBuilder()
            .setCustomId('suggestionVote ' + id + ' down')
            .setLabel('👎')
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder()
            .addComponents(thumbsUpButton, thumbsDownButton);

        interaction.client.channels.cache.get(suggestionChannel).send({ embeds: [embed], components: [actionRow]});

        await interaction.reply({ content: 'This is a suggestion modal!', ephemeral: true });
    }
};