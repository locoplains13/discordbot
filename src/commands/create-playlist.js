const fs = require("fs");

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-playlist")
    .setDescription("comando en progreso"),

  async execute(client, interaction) {
    let path =
      "C:/Users/alroc/Documents/DiscordBot/src/commands/playlists.json";

    // reading a JSON file synchronously
    const playlist = fs.readFileSync(path);
    // parsing the JSON content
    const user = JSON.parse(playlist);

    // logging the content read from a file
    interaction.reply("es un comando en progreso, no hace nada");
    console.log(user);
  },
};
