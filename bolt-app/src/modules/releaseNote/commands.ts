import { app } from '../../app';

export default function () {
  app.command('/release-note', async ({ ack, body, context }) => {
    await ack();

    try {
      await app.client.views.open({
        token: context.botToken,
        // 適切な trigger_id を受け取ってから 3 秒以内に渡す
        trigger_id: body.trigger_id,
        // view の値をペイロードに含む
        view: {
          type: 'modal',
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'リリースノート内容の確認',
            emoji: true,
          },
          submit: {
            type: 'plain_text',
            text: '確認',
            emoji: true,
          },
          close: {
            type: 'plain_text',
            text: 'Cancel',
            emoji: true,
          },
          blocks: [
            {
              type: 'input',
              element: {
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'master',
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-0',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-1',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-2',
                  },
                ],
              },
              label: {
                type: 'plain_text',
                text: '比較元(Base)ブランチを指定してください。',
                emoji: true,
              },
            },
            {
              type: 'input',
              element: {
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'v1.0.0',
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-0',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-1',
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text*',
                      emoji: true,
                    },
                    value: 'value-2',
                  },
                ],
              },
              label: {
                type: 'plain_text',
                text: '比較先(compare)のブランチを指定してください。',
                emoji: true,
              },
            },
          ],
        },
      });
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
}
