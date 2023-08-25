/// runs with command nodemon
require("dotenv").config();
const { Client, IntentsBitField, VoiceChannel } = require("discord.js");
const { OpusEncoder } = require("@discordjs/opus");

const {
  generateDependencyReport,
  getVoiceConnections,
} = require("@discordjs/voice");

const pathToFfmpeg = require("ffmpeg-static");

console.log(generateDependencyReport());
console.log(pathToFfmpeg);

const fs = require("fs");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

const { AudioPlayerStatus, entersState } = require("@discordjs/voice");

const { joinVoiceChannel } = require("@discordjs/voice");
const { getVoiceConnection } = require("@discordjs/voice");

const encoder = new OpusEncoder(48000, 2);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const guild = client.guilds.cache.get(process.env.GUILD_ID);
client.application.commands.fetch().then((c) => console.log(c));
client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    console.log(
      `${interaction.user.tag} used command ${interaction.commandName}`
    );
    interaction.reply("pong");
  }
  if (interaction.commandName === "play") {
    const voiceChannel = interaction.options.getChannel("channel");
    console.log(voiceChannel);
    ytdl("https://www.youtube.com/watch?v=FS0SzSE9Fic").pipe(
      fs.createWriteStream("C:/Users/alroc/Downloads/video.mp3")
    );
    const voiceConnection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
  }
  if (interaction.commandName === "pause") {
    interaction.reply("Paused song...");
    console.log(
      `${interaction.user.tag} used command ${interaction.commandName}`
    );
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
