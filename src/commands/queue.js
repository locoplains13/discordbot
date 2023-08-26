const { SlashCommandBuilder } = require("discord.js");
const { Manager } = require("erela.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Muestra la cola de canciones."),

  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player) interaction.reply("There is no player for this guild.");

    const queue = player.queue;

    const embed = new EmbedBuilder().setAuthor({
      name: `Cola para el canal de ${interaction.member.voice.channel.name}`,
    });

    const multiple = 10;
    const page = client.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current)
      embed.addFields([
        {
          name: "Rola que esta orita",
          value: `[${queue.current.title}](${queue.current.uri})`,
        },
      ]);

    if (!tracks.length)
      embed.setDescription(
        `No hay rolas ${page > 1 ? `page ${page}` : "en la fila"}.`
      );
    else
      embed.setDescription(
        tracks
          .map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`)
          .join("\n")
      );

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter({
      text: `Pagina ${page > maxPages ? maxPages : page} de ${maxPages}`,
    });

    interaction.reply({ embeds: [embed] });
  },
};
