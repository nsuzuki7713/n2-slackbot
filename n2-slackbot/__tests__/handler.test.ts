import { anniversaries, lambdaHandler, createText, isPostMessage } from '../src/handler';
import { Anniversary, SlackEvent } from '../src/interface';
import { eventTest } from './testData';
require('dotenv').config();

describe('lambdaHandler', (): void => {
  jest.mock('isPostMessage');
  it.only('test lambdaHandler', async (): Promise<any> => {
    // const response: any = await lambdaHandler(eventTest);
    // expect(response.statusCode).toBe(200);
  });
});

describe('createText()', (): void => {
  // https://stackoverflow.com/questions/56425230/mock-moment-in-jest
  jest.spyOn(Date, 'now').mockReturnValueOnce(new Date('2019/02/15').getTime());
  it('記念日の経過日数を返す', async () => {
    expect(createText('ダミー記念日', '2018/01/01')).toBe('ダミー記念日(2018/01/01): 1年1ヶ月14日');
  });
});

describe('isPostMessage()', (): void => {
  it('slack通知するevent', async () => {
    const eventParams: SlackEvent = {
      event: {
        text: '記念日',
        type: 'message',
        channel: process.env.SLACK_CHANNEL as string,
      },
    };
    expect(isPostMessage(eventParams)).toBe(true);
  });
  it('記念日というメッセージではないので、slack通知しない', async () => {
    const eventParams: SlackEvent = {
      event: {
        text: 'hello wrold',
        type: 'message',
        channel: process.env.SLACK_CHANNEL as string,
      },
    };
    expect(isPostMessage(eventParams)).toBe(false);
  });
  it('削除のイベントなので、slack通知しない', async () => {
    const eventParams: SlackEvent = {
      event: {
        text: '記念日',
        type: 'delete message',
        channel: process.env.SLACK_CHANNEL as string,
      },
    };
    expect(isPostMessage(eventParams)).toBe(false);
  });
  it('記念日以外のチャンネルなので、slack通知しない', async () => {
    const eventParams: SlackEvent = {
      event: {
        text: '記念日',
        type: 'message',
        channel: 'dummy',
      },
    };
    expect(isPostMessage(eventParams)).toBe(false);
  });
  it('ボットからの投稿なので、slack通知しない', async () => {
    const eventParams: SlackEvent = {
      event: {
        text: '記念日',
        type: 'message',
        channel: 'dummy',
        // eslint-disable-next-line @typescript-eslint/camelcase
        bot_id: 'aaa',
      },
    };
    expect(isPostMessage(eventParams)).toBe(false);
  });
});
