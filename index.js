const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();

const eventHandler = require('./event_handlers/event_handler.js');
const getModules = require('./get_modules.js');
const registerCommands = require('./register_commands.js');

getModules(client);
registerCommands();

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	eventHandler(interaction);
});

client.login(token);