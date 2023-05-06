const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('secretping')
    .setDescription('Replies with Secret Pong!'),
  async execute(interaction) {
    return interaction.reply({ content: 'Secret Pong!', ephemeral: true });
  },
};
