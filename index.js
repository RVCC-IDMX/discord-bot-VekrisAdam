/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const fs = require('node:fs');
const path = require('node:path');
const {
  Client, Collection, GatewayIntentBits, EmbedBuilder,
} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'cancel') {
    const cancelEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Command canceled')
      .setDescription('Have a nice day');
    await interaction.channel.send({ embeds: [cancelEmbed] });
    await interaction.update({ content: 'Command canceled', components: [] });
  } else if (interaction.customId === 'guide') {
    const guideEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Guide')
      .setDescription('This bot contains 4 slash commands that will reply with a pre-determined string, 1 slash command that echoes a user-input, and 1 slash command that contains buttons');
    await interaction.channel.send({ embeds: [guideEmbed] });
    await interaction.update({ content: 'Guide opened' });
  }
});

client.login(token);
