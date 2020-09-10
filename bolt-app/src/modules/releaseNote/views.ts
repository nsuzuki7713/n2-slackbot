import { app } from '../../app';
import * as GitHubClient from '../../services/githubClient';

export default function () {
  app.view('release-note-modal', async ({ ack, view, context }) => {
    await ack();
    const base = view['state']['values']['base']['selectedBranch']['selected_option']['value'] as string;
    const head = view['state']['values']['head']['selectedBranch']['selected_option']['value'] as string;

    const list = await GitHubClient.getPullRequestMergingList(base, head);

    list.map((v) => {
      return {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `${v.message}(<https://github.com/nsuzuki7713/typescript-node-adhoc-scripts/pull/${v.pullRequestNumber}|#${v.pullRequestNumber}>)`,
          },
        ],
      };
    });
    try {
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: 'CJNT26DLJ',
        text: '',
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: ':bulb: 差分情報', emoji: true },
          },
          {
            type: 'context',
            elements: [{ type: 'plain_text', text: `Baseブランチ: ${base}`, emoji: true }],
          },
          {
            type: 'context',
            elements: [{ type: 'plain_text', text: `Compareブランチ: ${head}`, emoji: true }],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `<https://github.com/nsuzuki7713/typescript-node-adhoc-scripts/compare/${base}...${head}|GitHubの差分>`,
              },
            ],
          },
          {
            type: 'header',
            text: { type: 'plain_text', text: ':writing_hand: 差分内容', emoji: true },
          },
          ...list.map((v) => {
            return {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `${v.message}(<https://github.com/nsuzuki7713/typescript-node-adhoc-scripts/pull/${v.pullRequestNumber}|#${v.pullRequestNumber}>)`,
                },
              ],
            };
          }),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  });
}
