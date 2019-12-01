import { slack } from "../src/slackBot";

describe("handler", (): void => {
  test("test lambdaHandler", async (): Promise<any> => {
    await slack();
  });
});
