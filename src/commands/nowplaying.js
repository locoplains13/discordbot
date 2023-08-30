"use strict";

const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription(
      "Muestra la cancion puesta orita y lo que le falta pa que se acabe"
    ),

  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);

    console.log(player);
    const queue = player.queue;

    if (!player) return interaction.reply("Pon musica primero, pa skipearla");

    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Tienes que estar en un canal skipear musica, kabron"
      );

    if (!player.queue.current)
      return interaction.reply("No tengo puesta musica pa skipear");

    const embed = new EmbedBuilder().setAuthor({
      name: `Rola de orita`,
    });

    embed.setDescription(`[${queue.current.title}](${queue.current.uri})`);
    let duration = queue.current.duration;

    duration = convertTime(duration);

    let position = player.position;
    position = convertTime(position);

    embed.addFields([
      {
        name: "Timeline",
        value: `${position} de ${duration}`,
      },
    ]);

    interaction.reply({ embeds: [embed] });
  },
};

function convertTime(duration) {
  duration = duration / 1000;
  parseInt(duration);

  console.log(`converting ${duration} to normal time`);

  let duration_secs = duration % 60;
  duration_secs = String(duration_secs);

  duration = duration / 60;

  let duration_hours;
  duration_hours = String(duration).substring(0, 1);

  let duration_minutes = duration / 60;
  duration_minutes = String(duration_minutes).substring(1, 5);
  duration_minutes = parseInt(parseFloat(duration_minutes * 60));

  if (duration_secs < 10) duration_secs = "0" + String(duration_secs);
  if (duration_minutes < 10 && !duration_hours)
    duration_minutes = 0 + parseInt(duration_minutes);

  console.log(typeof duration_secs);

  if (duration >= 3600) {
    duration = `${duration_hours}:${duration_minutes}:${duration_secs}`;
  } else {
    duration = `${duration_minutes}:${duration_secs.substring(0, 2)}`;
  }

  return duration;
}
