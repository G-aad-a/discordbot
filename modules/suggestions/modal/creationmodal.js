const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const embed = require('../_suggestionEmbed.js');

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

        suggestionChannel = data[interaction.guild.id].suggestionChannel;

        const thumbsUpButton = new ButtonBuilder()
            .setCustomId('suggestionVote ' + 'up')
            .setLabel('👍')
            .setStyle(ButtonStyle.Primary);

        const thumbsDownButton = new ButtonBuilder()
            .setCustomId('suggestionVote ' + 'down')
            .setLabel('👎')
            .setStyle(ButtonStyle.Danger);

        const actionRow = new ActionRowBuilder()
            .addComponents(thumbsUpButton, thumbsDownButton);

        const em = await embed(interaction.fields.getTextInputValue("titleInput"), interaction.fields.getTextInputValue("descriptionInput"), "0", "0");

        interaction.client.channels.cache.get(suggestionChannel).send({ embeds: [em], components: [actionRow]}).then(message => {

            data[interaction.guild.id].suggestions[message.id] = {
                title: interaction.fields.getTextInputValue("titleInput"),
                description: interaction.fields.getTextInputValue("descriptionInput"),
                upvotes: [],
                downvotes: []
            };

            fs.writeFileSync(path.join(interaction.client.foldersPath, 'suggestions/data.json'), JSON.stringify(data, null, 4));
        });

        await interaction.reply({ content: 'This is a suggestion modal!', ephemeral: true });
    }
};