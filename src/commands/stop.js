const { SlashCommandBuilder } = require("discord.js");
const play = require("./play");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription(
      "Para la cancion ponida orita y quita las otras canciones de la fila"
    ),
  async execute(client, interaction) {
    let player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("No hay ningun reproductor para el server");

    const channel = interaction.member.voice.channel;

    if (!channel)
      return interaction.reply("Necesitas estar en un canal de voz");
    if (channel.id !== player.voiceChannel)
      return interaction.reply("No mms, no estas en el mismo canal de voz");

    player.destroy();
    return interaction.reply("Se detuvo al reproductor");
  },
};
