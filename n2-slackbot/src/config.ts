import { Anniversary, Config } from './interface';

export let configInfo: Config;
export const anniversaries: Anniversary[] = [];

export function initialize(): void {
  configInfo = {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    SLACK_CHANNEL: process.env.SLACK_CHANNEL!,
    SLACK_CHANNEL_DEV: process.env.SLACK_CHANNEL_DEV!,
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN!,
  };

  for (let i = 1; i <= 7; i++) {
    anniversaries.push({
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      text: process.env[`ANNIVERSARY_TEXT${i}`]!,
      date: process.env[`ANNIVERSARY_DATE${i}`]!,
    });
  }
}
