const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Despausa la rokola"),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);

    if (!player) return interaction.reply("No pongo musica en este server");
    if (player.playing)
      return interaction.reply("Ya esta puesta la musica, wey");

    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Tienes que estar en un canal para resumir la musica"
      );

    player.play();

    interaction.reply("Se puso la rola de vuelta.");
  },
};
