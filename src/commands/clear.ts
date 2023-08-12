import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delets messages from the current channel")
    .addIntegerOption(option => {
      return option
        .setMaxValue(100)
        .setMinValue(1)
        .setName("count")
        .setDescription("Message amount to be cleared")
        .setRequired(true);
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  execute: interaction => {
    const count = interaction.options.getInteger("count") as number;

    interaction.channel?.messages.fetch({ limit: count }).then(async msg => {
      if (interaction.channel?.type === ChannelType.DM) return;

      const deleted_msg = await interaction.channel?.bulkDelete(msg, true);

      interaction.reply({ content: `Successfully deleted ${deleted_msg?.size} message(s)`, ephemeral: true });
    })
  },
  cooldown: 10
}

export default command;
