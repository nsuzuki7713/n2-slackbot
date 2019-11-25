# SlackBot

## 概要

「記念日教えて」と投稿すると、現在を基準に記念日の経過日数教えてくれるbot

```
・誕生日(1/10) : 5年と1ヶ月
・結婚記念日(7/25) : 5年と1ヶ月
・付き合った記念日(7/25) : 5年と1ヶ月
・婚約記念日(7/25) : 5年と1ヶ月
```

## 構成
### 環境

- APIGateway + Lambdaの環境
- Node.js 12(TypeScript)
- AWS SAM

### slackbot

Outgoing Webhooksはレガシーになっているので、Slack APPで実装する。[参考URL](https://qiita.com/NishimuraRisuto/items/342256f6ed6cb504059a)

## 作業ログ