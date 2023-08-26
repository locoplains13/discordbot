const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot ping!"),

  async execute(client, interaction) {
    interaction.reply(`Ping: ${client.ws.ping}`);
  },
};
