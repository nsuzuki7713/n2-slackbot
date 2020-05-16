/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { postMessage } from '../src/slackBot';
import { initialize, configInfo } from '../src/config';
import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

dotenv.config();
initialize();

jest.mock('@slack/web-api');
const mockPostMessage = jest.fn(() =>
  Promise.resolve({
    channel: 'dummy',
    ts: '111',
    message: 'test',
  })
);

// @ts-ignore
WebClient.mockImplementation(() => {
  return {
    chat: {
      postMessage: mockPostMessage,
    },
  };
});

describe('postMessage()', (): void => {
  beforeEach(() => {
    mockPostMessage.mockClear();
  });

  it('想定通りの引数でpostMessageが呼ばれる', async (): Promise<void> => {
    await postMessage('こんにちは', configInfo.SLACK_CHANNEL_DEV);
    // @ts-ignore
    expect(mockPostMessage.mock.calls[0][0]).toEqual({ text: 'こんにちは', channel: configInfo.SLACK_CHANNEL_DEV });
  });
});
