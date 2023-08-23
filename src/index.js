/// runs with command nodemon
require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

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

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "puto") {
    msg.reply("puta tu kola");
  }
  if (msg.content === "cuando murio halo?") {
    msg.reply("en reach");
  }
  if (msg.content === "jose review") {
    msg.reply("me caga ese we");
  }
  if (msg.content === "angel review") {
    msg.reply("ese we es mi apa");
  }
  if (msg.content === "rigo review") {
    msg.reply("ese kabron wele a sebolla");
  }
  console.log(`${msg.author.username} said ${msg.content}`);
});

client.login(process.env.TOKEN);
