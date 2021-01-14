import { lambdaHandler } from '../src/handler';
import * as _ from 'lodash';
import { eventTest } from './testData';
import { postMessage } from '../src/slackBot';

jest.mock('../src/slackBot', () => {
  return {
    postMessage: jest.fn(),
  };
});

describe('handlerのUT', () => {
  beforeEach(() => {
    (postMessage as jest.Mock).mockClear();
  });

  describe('lambdaHandlerの確認', () => {
    it('eventにbodyが存在しない場合はpostMessage()は呼ばれない', async () => {
      await lambdaHandler({});
      expect((postMessage as jest.Mock).mock.calls.length).toBe(0);
    });

    it('投稿がbotの場合はpostMessage()は呼ばれない', async () => {
      const mockEvent = _.cloneDeep(eventTest);
      const mockBody = {
        event: {
          text: '記念日',
          type: 'bot',
          channel: process.env.SLACK_CHANNEL_DEV,
        },
      };
      mockEvent.body = JSON.stringify(mockBody);
      await lambdaHandler(mockEvent);
      expect((postMessage as jest.Mock).mock.calls.length).toBe(0);
    });

    it('投稿が対象チャンネル以外の場合はpostMessage()は呼ばれない', async () => {
      const mockEvent = _.cloneDeep(eventTest);
      const mockBody = {
        event: {
          text: '記念日',
          type: 'message',
          channel: 'dummy',
        },
      };
      mockEvent.body = JSON.stringify(mockBody);
      await lambdaHandler(mockEvent);
      expect((postMessage as jest.Mock).mock.calls.length).toBe(0);
    });

    // githubActionの確認のため、skip
    it.skip('記念日のメッセージの場合はpostMessage()が呼ばれる', async () => {
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
      expect((postMessage as jest.Mock).mock.calls.length).toBe(1);

      const param1 = (postMessage as jest.Mock).mock.calls[0][0];
      const param2 = (postMessage as jest.Mock).mock.calls[0][1];
      expect(param1).toMatch(/記念日/);
      expect(param2).toBe(process.env.SLACK_CHANNEL_DEV);
    });

    it('ゴミの日のメッセージの場合はpostMessage()が呼ばれる', async () => {
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
      expect((postMessage as jest.Mock).mock.calls.length).toBe(1);

      const param1 = (postMessage as jest.Mock).mock.calls[0][0];
      const param2 = (postMessage as jest.Mock).mock.calls[0][1];
      expect(param1).toMatch(/ゴミ/);
      expect(param2).toBe(process.env.SLACK_CHANNEL_DEV);
    });
  });
});
