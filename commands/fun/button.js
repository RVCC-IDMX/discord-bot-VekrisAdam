const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('Multiple buttons'),
  async execute(interaction) {
    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);

    const guide = new ButtonBuilder()
      .setCustomId('guide')
      .setLabel('Guide')
      .setStyle(ButtonStyle.Primary);

    const link = new ButtonBuilder()
      .setLabel('repo')
      .setURL('https://github.com/RVCC-IDMX/discord-bot-VekrisAdam')
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(cancel, guide, link);

    await interaction.reply({
      content: 'Please pick an option:',
      components: [row],
    });
  },
};
