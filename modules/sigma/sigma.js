const { Message } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    type: 'event',
    async execute(message) {
        if (message instanceof Message && message.content.includes('erm')) {
            await message.reply(
                'https://tenor.com/view/erm-what-the-sigma-squidward-meme-tiktok-reaction-gif-574741893352575449'
            );
        }
    },
};