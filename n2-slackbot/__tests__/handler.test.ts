import { lambdaHandler } from '../src/handler';
import * as _ from 'lodash';
import { eventTest } from './testData';
import dotenv from 'dotenv';

dotenv.config();

describe.skip('実際にslackへ通知する確認', () => {
  it('記念日を通知する', async () => {
    const mockEvent = _.cloneDeep(eventTest);
    const mockBody = {
      event: {
        text: '記念日',
        type: 'message',
        channel: process.env.SLACK_CHANNEL_DEV,
      },
    };
    mockEvent.body = JSON.stringify(mockBody);
    await lambdaHandler(mockEvent);
  });

  it('ゴミの日を通知する', async () => {
    const mockEvent = _.cloneDeep(eventTest);
    const mockBody = {
      event: {
        text: 'ゴミの日',
        type: 'message',
        channel: process.env.SLACK_CHANNEL_DEV,
      },
    };
    mockEvent.body = JSON.stringify(mockBody);
    await lambdaHandler(mockEvent);
  });
});
