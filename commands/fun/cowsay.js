// eslint-disable-next-line import/no-extraneous-dependencies
const cowsay = require('cowsay');
const { SlashCommandBuilder } = require('discord.js');

function getCows(error, cowNames) {
  if (error) {
    console.log(error);
  } else if (cowNames) {
    // console.log(`Number of cows available: ${cowNames.length}`);
  }
}

const cows = cowsay.list(getCows);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('moo')
    .addStringOption((option) => option.setName('cowsay')
      .setRequired(true)
      .setDescription('Enter your desired cow')
      .setMaxLength(30))
    .addStringOption((option) => option.setName('msg')
      .setRequired(true)
      .setMaxLength(30)
      .setDescription('Enter the message you want displayed')),
  async execute(interaction) {
    const userInput = interaction.options.getString('cowsay');
    if (!((await cows).includes(userInput.concat('.cow'), 0))) {
      console.log(cows);
      console.log(userInput);
      await interaction.reply('Invalid cow, please moo again. Do not add ".cow" to the end of your desired cow');
    } else {
      const result = `\`\`\`${cowsay.say({
        text: interaction.options.getString('msg'),
        e: 'oO',
        T: 'U ',
        f: userInput,
      }).replaceAll('`', "'")}\`\`\``;
      if (result.length >= 2000) {
        await interaction.reply(`The cow you've chosen is too big, I've cut it down: \n${result.substring(0, 1939)}\`\`\``);
      } else {
        await interaction.reply(result);
      }
    }
  },
};
