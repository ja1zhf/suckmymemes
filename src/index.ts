import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { join, resolve } from "path";
import { config } from "dotenv";
import { SlashCommand } from "./types";

const ENV_FILE = process.env.NODE_ENV === "development" ? ".dev.env" : ".env";
const ENV_FILE_PATH = resolve(process.cwd(), ENV_FILE);
config({ path: ENV_FILE_PATH });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });

client.slashCommands = new Collection<string, SlashCommand>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
  if (!handler.endsWith(`${process.env.FORMAT}`)) return;
  require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN);

