import { app } from '../../app';

export default function () {
  app.view('view_1', async ({ ack, body, view }) => {
    // モーダルでのデータ送信イベントを確認
    await ack();
    // @ts-ignore
    console.log(view);
    console.log(body.view.blocks);
    console.log(body.view.blocks);
  });
}
