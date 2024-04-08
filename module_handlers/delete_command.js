const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const rest = new REST().setToken(token);

var args = String(process.argv.slice(2)[0]);

console.log(clientId, guildId, args);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, args))
    .then(() => console.log('Successfully deleted guild command'))
    .catch(console.error);

// rest.delete(Routes.applicationCommand(clientId, args))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);
