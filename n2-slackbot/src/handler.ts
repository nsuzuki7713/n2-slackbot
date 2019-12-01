import { postMessage } from "./slackBot";
import lambda from "aws-lambda";
import { EventApiRequest, Response } from "./interface";
require("dotenv").config();

export async function lambdaHandler(
  event: lambda.APIGatewayProxyEvent
): Promise<Response> {
  console.log(event);
  const body = JSON.parse(event.body as string) as EventApiRequest;

  if (isPostMessage(body)) {
    const text = createText();
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

function createText(): string {
  return "記念日\n 結構記念日(2015/7/25): 3年目:blush:";
}
