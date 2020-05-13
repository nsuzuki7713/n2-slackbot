import { postMessage } from './slackBot';
import lambda from 'aws-lambda';
import { Anniversary, SlackEvent, Response } from './interface';
import moment from 'moment';
import 'moment-precise-range-plugin';
import dotenv from 'dotenv';
import { initialize, configInfo } from './config';

dotenv.config();
initialize();

export const anniversaries: Anniversary[] = [
  {
    text: process.env.ANNIVERSARY_TEXT1 as string,
    date: process.env.ANNIVERSARY_DATE1 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT2 as string,
    date: process.env.ANNIVERSARY_DATE2 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT3 as string,
    date: process.env.ANNIVERSARY_DATE3 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT6 as string,
    date: process.env.ANNIVERSARY_DATE6 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT7 as string,
    date: process.env.ANNIVERSARY_DATE7 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT4 as string,
    date: process.env.ANNIVERSARY_DATE4 as string,
  },
  {
    text: process.env.ANNIVERSARY_TEXT5 as string,
    date: process.env.ANNIVERSARY_DATE5 as string,
  },
];

export async function lambdaHandler(event: lambda.APIGatewayProxyEvent): Promise<Response> {
  if (!event.body) {
    return {
      statusCode: 200,
    };
  }

  const slackEvent = JSON.parse(event.body) as SlackEvent;

  if (!isTargetChannel(slackEvent)) {
    return {
      statusCode: 200,
    };
  }

  switch (slackEvent.event.text) {
    case '記念日': {
      const message = anniversaries.map(anniversary => {
        return createText(anniversary.text, anniversary.date);
      });
      await postMessage(message.join('\n'));
    }
  }

  return {
    statusCode: 200,
  };
}

function isTargetChannel(slack: SlackEvent): boolean {
  // スラックボットからの投稿
  // 投稿の変更や削除
  // 記念日チャンネル以外
  // "記念日"という投稿以外からの場合は反応しない
  return (
    slack.event &&
    slack.event.type === 'message' &&
    !slack.event.subtype &&
    !slack.event.bot_id &&
    slack.event.channel === configInfo.SLACK_CHANNEL_DEV
  );
}

export function createText(anniversary: string, date: string): string {
  const diff = moment.preciseDiff(moment(), moment(date, 'YYYY/MM/DD'), true);
  return `${anniversary}(${date}): ${diff.years}年${diff.months}ヶ月${diff.days}日`;
}
