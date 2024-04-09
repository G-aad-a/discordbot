const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'erm',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('erm')
        .setDescription('Replies with childpo when called'),
    async execute(interaction) {
        await interaction.reply(
            'https://tenor.com/view/erm-what-the-sigma-squidward-meme-tiktok-reaction-gif-574741893352575449'
        );
    },
};