import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
  name: "ready",
  once: true,
  execute: (client: Client) => {
    client.user?.setPresence({
      activities: [{ name: "breakcore^^", type: ActivityType.Listening }],
      status: "online"
    });
    console.log(`${client.user?.tag} running in ${process.env.MODE}`);
  }
}

export default event;
