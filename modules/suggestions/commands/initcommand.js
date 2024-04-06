const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'suggestion',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Create a new suggestion 2'),
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setTitle('Create new suggestion')
            .setCustomId('suggestionModal');

        const titleInput = new TextInputBuilder()
            .setCustomId('titleInput')
            .setLabel('Title')
            .setPlaceholder('Enter the title of your suggestion')
            .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel('Description')
            .setPlaceholder('Enter the description of your suggestion')
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
    }
};