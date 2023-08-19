import { AttachmentBuilder, ChannelType, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js"
import { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("echo")
    .addChannelOption(option => {
      return option
        .setName("channel")
        .setDescription("Text channel")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    })
    .addStringOption(option => {
      return option
        .setName("content")
        .setDescription("Message content")
        .setRequired(true);
    })
    .setDescription("Return message to selected channel")
  ,
  execute: async (interaction) => {
    const channel = interaction.options.getChannel("channel") as TextChannel;
    const content = interaction.options.getString("content") as string;

    channel.send({ content });

    const file = new AttachmentBuilder('../../assets/images/canvas.png');
    // const embed = new EmbedBuilder()
    //   .setColor(0x0099FF)
    //   .setImage('attachment://canvas.png')

    interaction.reply({ /* embeds: [embed], */ files: [file], ephemeral: true });
  },
  cooldown: 10
}


export default command
