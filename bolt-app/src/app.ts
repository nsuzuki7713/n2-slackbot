import { App } from '@slack/bolt';
import releaseNote from './modules/releaseNote';
import dotenv from 'dotenv';

dotenv.config();

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

releaseNote();
