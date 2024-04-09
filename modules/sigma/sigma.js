const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages] });

client.on('messageCreate', message => {
    if (message.content.includes('erm')) {
        message.reply('What the sigma? https://tenor.com/view/erm-what-the-sigma-squidward-meme-tiktok-reaction-gif-574741893352575449');
    }
});