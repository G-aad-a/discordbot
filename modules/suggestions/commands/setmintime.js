const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'setmintime',
    type: 'command',
    permissions: 'admin',
    data: new SlashCommandBuilder()
        .setName('setmintime')
        .setDescription('Set the minimum duration for suggestions')
        .addIntegerOption((option) =>
            option
                .setName('mintime')
                .setDescription('Set the minimum duration for suggestions')
                .setRequired(true)
        ),
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

        data[interaction.guild.id].minTime =
            interaction.options.getInteger('mintime');

        fs.writeFileSync(
            path.join(interaction.client.foldersPath, 'suggestions/data.json'),
            JSON.stringify(data, null, 4)
        );

        await interaction.reply({
            content: `The minimum time between suggestions has been set to ${interaction.options.getInteger(
                'mintime'
            )} minutes.`,
            ephemeral: true,
        });
    },
};
