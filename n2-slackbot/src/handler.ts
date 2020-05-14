import { postMessage } from './slackBot';
import lambda from 'aws-lambda';
import { SlackEvent, Response } from './interface';
import moment from 'moment';
import 'moment-precise-range-plugin';
import dotenv from 'dotenv';
import { initialize, configInfo, anniversaries } from './config';

dotenv.config();
initialize();

export async function lambdaHandler(event: lambda.APIGatewayProxyEvent): Promise<Response> {
  if (!event.body) return response();

  const slackEvent = JSON.parse(event.body) as SlackEvent;

  if (!isTargetChannel(slackEvent)) return response();
  switch (slackEvent.event.text) {
    case '記念日':
      await postMessage(createAnniversaryMessage());
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

export function createAnniversaryMessage(): string {
  return anniversaries
    .map(anniversary => {
      const diff = moment.preciseDiff(moment(), moment(anniversary.date, 'YYYY/MM/DD'), true);
      return `${anniversary.text}(${anniversary.date}): ${diff.years}年${diff.months}ヶ月${diff.days}日`;
    })
    .join('\n');
}
