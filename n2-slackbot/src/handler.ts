import { postMessage } from './slackBot';
import { SlackEvent, Response } from './interface';
import 'moment-precise-range-plugin';
import { initialize, configInfo } from './config';
import { createAnniversaryMessage, createGarbageMessage } from './modules/messages';

initialize();

export async function lambdaHandler(event: { body: string }): Promise<Response> {
  if (!event.body) return response();

  const slackEvent = JSON.parse(event.body) as SlackEvent;

  if (!isTargetChannel(slackEvent)) return response();
  switch (slackEvent.event.text) {
    case '記念日':
      await postMessage(createAnniversaryMessage(), slackEvent.event.channel);
      break;
    case 'ゴミの日':
      await postMessage(createGarbageMessage(), slackEvent.event.channel);
      break;
  }

  return response();
}

function response(): { statusCode: number } {
  return {
    statusCode: 200,
  };
}

function isTargetChannel(slack: SlackEvent): boolean {
  // ユーザの投稿で、チャンネルが「ボッコ返答」「開発用チャンネル」の場合に後続処理を行う
  return (
    slack.event &&
    slack.event.type === 'message' &&
    !slack.event.subtype &&
    !slack.event.bot_id &&
    (slack.event.channel === configInfo.SLACK_CHANNEL_DEV || slack.event.channel === configInfo.SLACK_CHANNEL)
  );
}
