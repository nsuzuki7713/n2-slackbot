import { postMessage } from "../src/slackBot";

describe("postMessage()", (): void => {
  it("slack投稿の動作確認", async (): Promise<void> => {
    const text = "記念日\n 結婚記念日(2015/7/25): 3年目:blush:";
    await postMessage(text);
  });
});
