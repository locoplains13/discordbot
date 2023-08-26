const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a given song")
    .addStringOption((option) =>
      option
        .setName("song_name")
        .setDescription("Enter the name of the song you want to play")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const song_name = interaction.options.getString("song_name");

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "You should join a voice channel to play music",
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
    if (player.playing)
      interaction.reply(`Adding ${songs.tracks[0].title} to queue`);
    interaction.reply(`Playing ${songs.tracks[0].title}`);
  },
};
