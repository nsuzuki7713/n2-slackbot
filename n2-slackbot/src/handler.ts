import { postMessage } from "./slackBot";
import lambda from "aws-lambda";
import { EventApiRequest, Response } from "./interface";
import moment from "moment";
import "moment-precise-range-plugin";
require("dotenv").config();

export async function lambdaHandler(
  event: lambda.APIGatewayProxyEvent
): Promise<Response> {
  console.log(event);
  const body = JSON.parse(event.body as string) as EventApiRequest;

  if (isPostMessage(body)) {
    const text = createText("結婚記念日", "2015/07/25");
    await postMessage(text);
  }

  const response = {
    statusCode: 200
  };
  return response;
}

function isPostMessage(body: EventApiRequest): boolean {
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
