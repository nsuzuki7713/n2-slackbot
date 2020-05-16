/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Anniversary, Config } from './interface';
import dotenv from 'dotenv';

export let configInfo: Config;
export const anniversaries: Anniversary[] = [];

export function initialize(): void {
  dotenv.config();
  configInfo = {
    SLACK_CHANNEL: process.env.SLACK_CHANNEL!,
    SLACK_CHANNEL_DEV: process.env.SLACK_CHANNEL_DEV!,
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN!,
  };

  for (let i = 1; i <= 7; i++) {
    anniversaries.push({
      text: process.env[`ANNIVERSARY_TEXT${i}`]!,
      date: process.env[`ANNIVERSARY_DATE${i}`]!,
    });
  }
}
