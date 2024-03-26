import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import Canvas from "@napi-rs/canvas";
import { request } from "undici";
const { join } = require("path");

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("profile")
    .addUserOption((option) => {
      return option.setName("user").setDescription("User").setRequired(false);
    })
    .setDescription("Return user profile"),
  execute: async (interaction) => {
    const user = interaction.options.getUser("user");

    const nickname = user ? user.displayName : interaction.user.displayName;
    const profile = user
      ? user.displayAvatarURL({ extension: "jpg" })
      : interaction.user.displayAvatarURL({ extension: "jpg" });

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    Canvas.GlobalFonts.registerFromPath(
      join(__dirname, "../../", "fonts", "Roboto.ttf"),
      "Roboto"
    );
    context.font = "28px Roboto";
    context.strokeStyle = "#ffffff";
    context.fillStyle = "#ffffff";
    context.fillText(nickname, canvas.width / 2.5, canvas.height / 3.5);

    const { body } = await request(profile);
    const avatar = await Canvas.loadImage(await body.arrayBuffer());

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
      name: "profile.png",
    });

    interaction.reply({ files: [attachment] });
  },
  cooldown: 10,
};

export default command;
