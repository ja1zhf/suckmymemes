import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";

export = (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = []

  let slashCommandsDir = join(__dirname, "../commands")

  readdirSync(slashCommandsDir).forEach(file => {
    if (!file.endsWith(`${process.env.FORMAT}`)) return;
    let command: SlashCommand = require(`${slashCommandsDir}/${file}`).default
    slashCommands.push(command.command)
    client.slashCommands.set(command.command.name, command)
  })

  const rest = new REST({ version: "10" }).setToken(`${process.env.TOKEN}`);

  rest.put(Routes.applicationCommands(`${process.env.CLIENT_ID}`), {
    body: slashCommands.map(command => command.toJSON())
  }).catch(e => {
    console.log(e)
  })
}
