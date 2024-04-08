const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const embed = require('../_suggestionEmbed.js');

module.exports = {
    name: 'suggestionModal',
    type: 'modal',
    async execute(interaction) {
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
        if (!data[interaction.guild.id]) {
            await interaction.reply({
                content:
                    'Please set the suggestion channel first using /setchannel!',
                ephemeral: true,
            });
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

        const actionRow = new ActionRowBuilder().addComponents(
            thumbsUpButton,
            thumbsDownButton
        );

        const time = interaction.fields.getTextInputValue('datetimeInput');
        const regex = new RegExp(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/);

        if (!regex.test(time))
            return interaction.reply({
                content:
                    'Invalid date and time format. Please use the following format: MM-DD-YYYY HH:MM',
                ephemeral: true,
            });

        const inttime = new Date(time).getTime();

        if (inttime < Date.now() + data[interaction.guild.id].minTime * 60000)
            return interaction.reply({
                content: `The minimum time between suggestions is ${
                    data[interaction.guild.id].minTime
                } minutes.`,
                ephemeral: true,
            });

        if (inttime < Date.now())
            return interaction.reply({
                content:
                    'The date and time you entered is in the past. Please enter a future date and time.',
                ephemeral: true,
            });

        const em = await embed(
            interaction.fields.getTextInputValue('titleInput'),
            interaction.fields.getTextInputValue('descriptionInput'),
            '0',
            '0',
            inttime,
            'pending',
            interaction.user.id
        );

        interaction.client.channels.cache
            .get(suggestionChannel)
            .send({ embeds: [em], components: [actionRow] })
            .then((message) => {
                data[interaction.guild.id].suggestions[message.id] = {
                    title: interaction.fields.getTextInputValue('titleInput'),
                    description:
                        interaction.fields.getTextInputValue(
                            'descriptionInput'
                        ),
                    upvotes: [],
                    downvotes: [],
                    time: inttime,
                    status: 'pending',
                    creator: interaction.user.id,
                };

                fs.writeFileSync(
                    path.join(
                        interaction.client.foldersPath,
                        'suggestions/data.json'
                    ),
                    JSON.stringify(data, null, 4)
                );
            });

        await interaction.reply({
            content: 'This is a suggestion modal!',
            ephemeral: true,
        });
    },
};
