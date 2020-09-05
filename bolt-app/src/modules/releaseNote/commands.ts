import { app } from '../../app';
import * as GitHubClient from '../../services/githubClient';
import { Option } from '@slack/bolt';

export default function () {
  app.command('/release-note', async ({ ack, body, context }) => {
    await ack();

    try {
      const [branches, tags] = await Promise.all([GitHubClient.listBranches(), GitHubClient.listTags()]);
      const options: Option[] = [...branches, ...tags].map((name) => {
        return {
          text: { type: 'plain_text', text: name, emoji: true },
          value: name,
        };
      });

      await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'release-note-modal',
          title: { type: 'plain_text', text: 'リリースノート内容の確認', emoji: true },
          submit: { type: 'plain_text', text: '確認', emoji: true },
          close: { type: 'plain_text', text: 'Cancel', emoji: true },
          blocks: [
            {
              type: 'input',
              block_id: 'base',
              element: {
                type: 'static_select',
                placeholder: { type: 'plain_text', text: 'master', emoji: true },
                options,
                action_id: 'selectedBranch',
              },
              label: { type: 'plain_text', text: '比較元(Base)ブランチを指定してください。', emoji: true },
            },
            {
              type: 'input',
              block_id: 'head',
              element: {
                type: 'static_select',
                placeholder: { type: 'plain_text', text: 'v1.0.0', emoji: true },
                options,
                action_id: 'selectedBranch',
              },
              label: { type: 'plain_text', text: '比較先(compare)のブランチを指定してください。', emoji: true },
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
