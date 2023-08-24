require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "play",
    description: "Plays a given song",
  },
  {
    name: "pause",
    description: "Pauses the current song",
  },
  {
    name: "stop",
    description: "Stops and clears the current queue",
  },
  {
    name: "queue",
    description: "Displays the current song queue",
  },
  {
    name: "clear",
    description: "Clears the current queue except the current song",
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
