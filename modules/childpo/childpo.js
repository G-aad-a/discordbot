const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'childpo',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('childpo')
        .setDescription('Replies with childpo when called'),
    async execute(interaction) {
        await interaction.reply(
            'https://tenor.com/view/child-po-kung-fu-panda-panda-kung-fu-gif-27359038'
        );
    },
};