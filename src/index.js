const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { Manager } = require("erela.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const commands = [];
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}
console.log(commandFiles);

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.once("ready", () => {
  client.manager.init(client.user.id);
  console.log(`${client.user.tag} is now online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    command.execute(client, interaction);
  } catch (error) {
    interaction.reply({
      content: "There was an error executing this command.",
      ephemeral: true,
    });
  }
});

//music manager
const nodes = [
  {
    host: "lavalink.lexnet.cc",
    password: "lexn3tl@val!nk",
    port: 443,
    secure: true,
  },
];

// Assign Manager to the client variable
client.manager = new Manager({
  // The nodes to connect to, optional if using default lavalink options
  nodes,
  // Method to send voice data to Discord
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
    if (guild) guild.shard.send(payload);
  },
});

// Emitted whenever a node connects
client.manager.on("nodeConnect", (node) => {
  console.log(`Node "${node.options.identifier}" connected.`);
});

// Emitted whenever a node encountered an error
client.manager.on("nodeError", (node, error) => {
  console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  );
});

// THIS IS REQUIRED. Send raw events to Erela.js
client.on("raw", (d) => client.manager.updateVoiceState(d));

// bot starts and logs in
client.login(process.env.TOKEN);
