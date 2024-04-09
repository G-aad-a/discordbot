const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const path = require('path');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
] });

client.commands = new Collection();
client.subcommands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();

client.foldersPath = path.join(__dirname, 'modules');
client.eventFoldersPath = path.join(__dirname, 'event_modules');

const getModules = require('./module_handlers/get_modules.js');
const registerCommands = require('./module_handlers/register_commands.js');
const registerEvents = require('./module_handlers/register_events.js');

getModules(client);
registerCommands(client);
registerEvents(client);


client.login(token);
