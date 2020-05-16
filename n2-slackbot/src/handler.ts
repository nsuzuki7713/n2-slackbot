import { postMessage } from './slackBot';
import lambda from 'aws-lambda';
import { SlackEvent, Response } from './interface';
import moment from 'moment';
import 'moment-precise-range-plugin';
import { initialize, configInfo, anniversaries } from './config';

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

export function createAnniversaryMessage(): string {
  return anniversaries
    .map(anniversary => {
      const diff = moment.preciseDiff(moment(), moment(anniversary.date, 'YYYY/MM/DD'), true);
      return `${anniversary.text}(${anniversary.date}): ${diff.years}年${diff.months}ヶ月${diff.days}日`;
    })
    .join('\n');
}

export function createGarbageMessage(): string {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const garbageWeek = [2, 4];
  let date = moment().utcOffset('+0900');
  const message = [];
  let count = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const weekCount = Math.floor((date.date() + 6) / 7);
    const weekday = weekdays[date.days()];

    if (garbageWeek.includes(weekCount)) {
      if (weekday === '金') {
        message.push(`燃やさないゴミは${count}日後の${date.format('M/D')}`);
      }
      if (weekday === '水') {
        message.push(`古紙・ビンカンゴミは${count}日後の${date.format('M/D')}`);
      }
      if (weekday === '土') {
        message.push(`ペットボトルは${count}日後の${date.format('M/D')}`);
      }
    }
    if (message.length >= 3) {
      break;
    }
    count++;
    date = date.add(1, 'd');
  }

  message.push('https://www.city.arakawa.tokyo.jp/kurashi/gomi/shushubi/syusyubi.files/saisin-gominodasikata.pdf');

  return message.join('\n');
}
