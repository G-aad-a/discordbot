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

        const datetimeInput = new TextInputBuilder()
            .setCustomId('datetimeInput')
            .setLabel('Enter the date and time for your suggestion.')
            .setPlaceholder('Example: 12-31-2022 23:59')
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
        const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(datetimeInput);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);
    }
};