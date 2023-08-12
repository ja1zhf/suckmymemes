import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("roll")
    .addIntegerOption(option => {
      return option
        .setName("count")
        .setDescription("Input number")
        .setRequired(true);
    })
    .addIntegerOption(option => {
      return option
        .setName("count_max")
        .setDescription("Input max number")
        .setRequired(false);
    })
    .setDescription("Return random number"),
  execute: interaction => {
    const count = interaction.options.getInteger("count") as number;
    const count_max = interaction.options.getInteger("count_max") as number;

    if (count_max === null)
      return interaction.reply(Math.floor(Math.random() * count + 1).toString());
    else
      return interaction.reply((Math.floor(Math.random() * (count_max + 1 - count)) + count).toString())

  },
  cooldown: 0
}

export default command;

