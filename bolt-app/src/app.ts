import { App, BlockAction, BlockElementAction } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// 特定の文字列、この場合 👋絵文字を含むメッセージと一致
app.message(':wave:', async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});

app.message(/^(hi|hello|hey).*/, async ({ context, say }) => {
  // context.matches の内容が特定の正規表現と一致
  const greeting = context.matches[0];

  await say(`${greeting}, how are you?`);
});

// "knock knock" を含むメッセージをリッスンし、 "who's there?" というメッセージをイタリック体で送信
app.message('knock knock', async ({ say }) => {
  await say(`_Who's there?_`);
});

// 誰かが 📅 絵文字でリアクションした時に、日付ピッカー block を送信
// app.event('reaction_added', async ({ event, say }) => {
//   if (event.reaction === 'calendar') {
//     await say({
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'mrkdwn',
//             text: 'Pick a date for me to remind you',
//           },
//           accessory: {
//             type: 'datepicker',
//             action_id: 'datepicker_remind',
//             initial_date: '2019-04-28',
//             placeholder: {
//               type: 'plain_text',
//               text: 'Select a date',
//             },
//           },
//         },
//       ],
//     });
//   }
// });

// この echo コマンドは ただ、その引数を（やまびこのように）おうむ返しする
app.command('/echo', async ({ command, ack, say }) => {
  // コマンドリクエストを確認
  await ack();

  await say(`${command.text}`);
});

// コマンド起動をリッスン
app.command('/ticket', async ({ ack, body, context }) => {
  // コマンドのリクエストを確認
  await ack();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      // 適切な trigger_id を受け取ってから 3 秒以内に渡す
      trigger_id: body.trigger_id,
      // view の値をペイロードに含む
      view: {
        type: 'modal',
        // callback_id が view を特定するための識別子
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Welcome to a modal with _blocks_',
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click me!',
              },
              action_id: 'button_abc',
            },
          },
          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true,
            },
          },
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// action_id: button_abc のボタンを押すイベントをリッスン
// （そのボタンはモーダルの中にあるという想定）
app.action('button_abc', async ({ ack, body, context }) => {
  // ボタンを押したイベントを確認
  await ack();

  try {
    const result = await app.client.views.update({
      token: context.botToken,
      // リクエストに含まれる view_id を渡す
      view_id: (body as BlockAction<BlockElementAction>).view!.id,
      // 更新された view の値をペイロードに含む
      view: {
        type: 'modal',
        // callback_id が view を特定するための識別子
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Updated modal',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'You updated the modal!',
            },
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated',
          },
        ],
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.shortcut('callback_id', async ({ shortcut, ack, context }) => {
  // グローバルショートカットリクエストの確認
  ack();

  try {
    // 組み込みの WebClient を使って views.open API メソッドを呼び出す
    const result = await app.client.views.open({
      // `context` オブジェクトに保持されたトークンを使用
      token: context.botToken,
      trigger_id: shortcut.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'My App',
        },
        close: {
          type: 'plain_text',
          text: 'Close',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                'About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>.',
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text:
                  'Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>',
              },
            ],
          },
        ],
      },
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
