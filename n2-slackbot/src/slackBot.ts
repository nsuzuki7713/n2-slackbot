import { WebClient, WebAPICallResult } from "@slack/web-api";
require("dotenv").config();

const web = new WebClient(process.env.SLACK_BOT_TOKEN);

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    text: string;
  };
}

export async function slack(): Promise<void> {
  // The result is cast to the interface
  const res = (await web.chat.postMessage({
    text: "Hello world",
    channel: process.env.SLACK_CHANNEL as string
  })) as ChatPostMessageResult;

  // Properties of the result are now typed
  console.log(
    `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message}`
  );
}
