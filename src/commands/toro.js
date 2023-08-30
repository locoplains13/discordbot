const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toro")
    .setDescription("Manda una foto de un torito"),

  async execute(client, interaction) {
    const link = [
      "https://imgur.com/kp8NQGs",
      "https://imgur.com/PSVVB7p",
      "https://imgur.com/UQ1nm83",
      "https://imgur.com/2zB31sV",
      "https://imgur.com/WqD3Nb1",
      "https://imgur.com/tbDQgti",
      "https://imgur.com/ugZvEdA",
      "https://imgur.com/gQmYOhW",
      "https://imgur.com/z7GgRRM",
    ];

    let randomPic = Math.floor(Math.random() * link.length - 1);

    interaction.reply(`${link[randomPic]}`);
  },
};
