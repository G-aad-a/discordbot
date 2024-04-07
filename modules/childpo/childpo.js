const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'childpo',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('childpo')
        .setDescription('Replies with childpo when called'),
    async execute(interaction) {
        await interaction.reply({
            content:
                'https://images-ext-1.discordapp.net/external/bywdfMnfo1xA26Ss1cn4aozbTEixB6PVYI_8STBtfUc/https/media.tenor.com/1xjPZoSoc_QAAAPo/child-po.mp4',
        });
    },
};
