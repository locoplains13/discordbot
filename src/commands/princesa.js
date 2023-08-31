const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("princesa")
    .setDescription("Q.E.P.D. la goodest girl"),

  async execute(client, interaction) {
    const link = ["https://imgur.com/fNwkKij", "https://imgur.com/o4ertnV"];

    let randomPic = Math.floor(Math.random() * link.length);

    console.log(randomPic);

    interaction.reply(`${link[randomPic]}`);
  },
};
