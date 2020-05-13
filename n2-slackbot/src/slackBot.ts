import { WebClient } from '@slack/web-api';
import { ChatPostMessageResult } from './interface';
import { configInfo } from './config';

/**
 * メッセージを受け取り、記念日チャンネルに投稿する
 * @param text メッセージ内容
 */
export async function postMessage(text: string): Promise<void> {
  const web = new WebClient(process.env.SLACK_BOT_TOKEN);
  const res = (await web.chat.postMessage({
    text,
    channel: configInfo.SLACK_CHANNEL_DEV,
  })) as ChatPostMessageResult;

  // Properties of the result are now typed
  console.log(
    `A message was posed to conversation ${res.channel} with id ${res.ts} which contains the message ${res.message}`
  );
}
