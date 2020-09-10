# bolt-app

boltのフレームワークを利用したslack-bot

## 開発方法

- `ngrok http 3000` でproxyの設定をする
- URLをslackのbotに設定する
  - Interactivity & Shortcuts と　Slash Commands
- slackから実際に叩く

## 今の機能

brancnの差分からプルリクでマージしたものの一覧を出力する

- slach commandsで `/ release-note`
- modalが表示される
- ブランチを選択する
- 結果が投稿される