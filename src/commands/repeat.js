const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription(
      "Repite la cancion que esta ahorita y las otras de la fila"
    ),
  async execute(client, interaction) {
    let player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("No hay ningun reproductor para el server");

    const channel = interaction.member.voice.channel;

    if (!channel)
      return interaction.reply("Necesitas estar en un canal de voz");
    if (channel.id !== player.voiceChannel)
      return interaction.reply(
        "seas mamona, no estas en el mismo canal de voz"
      );

    if (client.length && /queue/i.test(client[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "activado" : "desactivado";
      return interaction.reply(`Repetir las rolas de la fila: ${queueRepeat}`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "activado" : "desactivado";
    return interaction.reply(`Repetir la rola de orita: ${trackRepeat}`);
  },
};
