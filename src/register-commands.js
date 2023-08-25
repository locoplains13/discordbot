require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const { client } = require("discord.js");

const commands = [
  {
    name: "play",
    description: "Plays a given song",
    options: [
      {
        name: "channel",
        description: "The channel the bot is to join",
        type: ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "url",
        description: "The URL of the song you wish to play",
        type: ApplicationCommandOptionType.Channel,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Slash commands were registered successfully...");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
