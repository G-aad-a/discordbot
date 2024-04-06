const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();

client.foldersPath = path.join(__dirname, 'modules');

const eventHandler = require('./event_handlers/event_handler.js');
const getModules = require('./module_handlers/get_modules.js');
const registerCommands = require('./module_handlers/register_commands.js');

getModules(client);
registerCommands(client);

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	eventHandler(interaction);
});

client.login(token);