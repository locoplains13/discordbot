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
const { Manager } = require("erela.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Pone una rola en el canal de voz en el que estas")
    .addStringOption((option) =>
      option
        .setName("Cancion")
        .setDescription("El nombre o link de una cancion que quieras")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    let song_name = interaction.options.getString("Cancion");
    song_name = song_name.substring(0, 43);

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "Tienes que estar en un canal para poner musica",
        ephemeral: true,
      });

    let player = client.manager.players.get(interaction.guild.id);

    if (!player)
      player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
      });

    const songs = await client.manager.search(song_name);

    player.connect();

    player.queue.add(songs.tracks[0]);

    if (!player.playing) player.play();

    let duration = songs.tracks[0].duration;

    duration = duration / 1000;

    let duration_secs;
    duration_secs = duration % 60;
    duration_secs = String(duration_secs);

    duration = duration / 60;

    let duration_hours;
    duration_hours = String(duration).substring(0, 1);

    let duration_minutes = duration / 60;
    duration_minutes = String(duration_minutes).substring(1, 5);
    duration_minutes = parseInt(parseFloat(duration_minutes) * 60);

    if (duration_secs < 10) duration_secs = 0 + String(duration_secs);
    if (duration_minutes < 10 && !duration_hours)
      duration_minutes = 0 + String(duration_minutes);

    if (duration >= 3600) {
      duration = `${duration_hours}:${duration_minutes}:${duration_secs}`;
    } else {
      duration = `${duration_minutes}:${duration_secs}`;
    }

    interaction.reply(
      `${bold(songs.tracks[0].title)}. \`${duration}\` Pedidad por ${italic(
        interaction.user.tag
      )}.`
    );
  },
};