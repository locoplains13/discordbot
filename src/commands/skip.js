const { SlashCommandBuilder } = require("discord.js");
const {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Salta la rola que esta ponida orita"),
  async execute(client, interaction) {
    const player = interaction.client.manager.get(interaction.guild.id);

    console.log(player);

    if (!player) return interaction.reply("Pon musica primero, pa skipearla");

    const channel = interaction.member.voice;

    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Tienes que estar en un canal skipear musica, kabron"
      );

    if (!player.queue.current)
      return interaction.reply("No tengo puesta musica pa skipear");

    const song = player.queue.current.title;
    player.stop();

    return interaction.reply(`Me salte la de ${bold(song)}`);
  },
};
