const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pausa la rola"),

  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
  },
};
