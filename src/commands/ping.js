const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Cualquier numero que no sea -1, significa que el bot esta desconectado"
    ),

  async execute(client, interaction) {
    interaction.reply(`Ping: ${client.ws.ping}`);
  },
};
