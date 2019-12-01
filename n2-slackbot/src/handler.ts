import { slack } from "./slackBot";
import lambda from "aws-lambda";

export async function lambdaHandler(
  event: lambda.APIGatewayProxyEvent,
  context: lambda.Context
): Promise<any> {
  console.log(event);
  console.log(context);
  const body = JSON.parse(event.body as string);

  if (
    body.event &&
    body.event.type === "message" &&
    !body.event.subtype &&
    !body.event.bot_id &&
    body.event.channel === "CK2LL2QVC"
  ) {
    await slack();
  }

  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        challenge: body.challenge
      })
    };

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
