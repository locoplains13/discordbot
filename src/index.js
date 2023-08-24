/// runs with command nodemon
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { OpusEncoder } = require("@discordjs/opus");

const { generateDependencyReport } = require("@discordjs/voice");

const pathToFfmpeg = require("ffmpeg-static");

console.log(generateDependencyReport());
console.log(pathToFfmpeg);

const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

const encoder = new OpusEncoder(48000, 2);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "play") {
    interaction.reply("Playing song...");
  }
  if (interaction.commandName === "pause") {
    interaction.reply("Paused song...");
  }
  if (interaction.commandName === "stop") {
    interaction.reply("Stopping song..");
  }
  if (interaction.commandName === "queue") {
    interaction.reply("Here is the current list of songs...");
  }
  if (interaction.commandName === "clear") {
    interaction.reply("queue cleared");
  }
});

client.login(process.env.TOKEN);
