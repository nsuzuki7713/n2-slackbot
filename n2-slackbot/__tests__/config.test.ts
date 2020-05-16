/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { initialize, configInfo, anniversaries } from '../src/config';

describe('config.tsのUT', () => {
  it('initialize()で環境変数が正しく初期化されている', () => {
    initialize();
    expect(configInfo).toEqual({
      SLACK_CHANNEL: process.env.SLACK_CHANNEL!,
      SLACK_CHANNEL_DEV: process.env.SLACK_CHANNEL_DEV!,
      SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN!,
    });

    for (let i = 0; i < anniversaries.length; i++) {
      expect(anniversaries[i]).toEqual({
        text: process.env[`ANNIVERSARY_TEXT${i + 1}`],
        date: process.env[`ANNIVERSARY_DATE${i + 1}`],
      });
    }
  });
});
