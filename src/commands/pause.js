const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausa la rola"),

  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("No hay un reproductor para el server.");

    const channel = interaction.member.voice.channel;

    if (!channel)
      return interaction.reply("Tienes que estar en un canal de voz.");

    if (!player.playing)
      return interaction.reply("La rokola ya esta pausada, wey");

    player.pause(true);
    interaction.reply("Rokola pausada");
  },
};
