import { postMessage } from "./slackBot";
import lambda from "aws-lambda";
import { Anniversary, EventApiRequest, Response } from "./interface";
import moment from "moment";
import "moment-precise-range-plugin";
require("dotenv").config();

export const anniversaries: Anniversary[] = [
  {
    text: process.env.ANNIVERSARY_TEXT1 as string,
    date: process.env.ANNIVERSARY_DATE1 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT2 as string,
    date: process.env.ANNIVERSARY_DATE2 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT3 as string,
    date: process.env.ANNIVERSARY_DATE3 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT6 as string,
    date: process.env.ANNIVERSARY_DATE6 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT7 as string,
    date: process.env.ANNIVERSARY_DATE7 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT4 as string,
    date: process.env.ANNIVERSARY_DATE4 as string
  },
  {
    text: process.env.ANNIVERSARY_TEXT5 as string,
    date: process.env.ANNIVERSARY_DATE5 as string
  }
];

export async function lambdaHandler(
  event: lambda.APIGatewayProxyEvent
): Promise<Response> {
  console.log(event);
  const body = JSON.parse(event.body as string) as EventApiRequest;

  if (isPostMessage(body)) {
    const message = anniversaries.map(anniversary => {
      return createText(anniversary.text, anniversary.date);
    });
    // await postMessage(message.join("\n"));
  }

  const response = {
    statusCode: 200
  };
  return response;
}

export function isPostMessage(body: EventApiRequest): boolean {
  // スラックボットからの投稿
  // 投稿の変更や削除
  // 記念日チャンネル以外
  // "記念日"という投稿以外からの場合は反応しない
  return (
    body.event &&
    body.event.type === "message" &&
    !body.event.subtype &&
    !body.event.bot_id &&
    body.event.channel === process.env.SLACK_CHANNEL &&
    body.event.text === "記念日"
  );
}

export function createText(anniversary: string, date: string): string {
  const diff = moment.preciseDiff(moment(), moment(date, "YYYY/MM/DD"), true);
  return `${anniversary}(${date}): ${diff.years}年${diff.months}ヶ月${diff.days}日`;
}
