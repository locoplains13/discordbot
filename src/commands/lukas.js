const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lukas")
    .setDescription("Manda una foto de un perrito"),

  async execute(client, interaction) {
    const link = [
      "https://imgur.com/KHErt8G",
      "https://imgur.com/m7hoeKx",
      "https://imgur.com/c0n1H6s",
      "https://imgur.com/tvaqyr5",
      "https://imgur.com/1W5WQm8",
      "https://imgur.com/rFyETAE",
      "https://imgur.com/iDam9bA",
      "https://imgur.com/E4sxg2S",
      "https://imgur.com/3YbAn72",
      "https://imgur.com/quvO7iZ",
      "https://imgur.com/URtx8QN",
      "https://imgur.com/8mPif5h",
      "https://imgur.com/rn7SAiI",
      "https://imgur.com/lbzP6kN",
      "https://imgur.com/ZgfgVyO",
      "https://imgur.com/1zHgspP",
      "https://imgur.com/gyXkLCG",
      "https://imgur.com/gdBnj8o",
      "https://imgur.com/COA2pzf",
      "https://imgur.com/ByHgZmR",
      "https://imgur.com/rg7Ocbd",
      "https://imgur.com/7EMi1a1",
      "https://imgur.com/I2Ckwuz",
      "https://imgur.com/ol0EnOs",
      "https://imgur.com/cj9hYQn",
    ];

    let randomPic = Math.floor(Math.random() * link.length);

    interaction.reply(`${link[randomPic]}`);
  },
};
