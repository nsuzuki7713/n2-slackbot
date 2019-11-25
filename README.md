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
### node12をインストール
```
$ sudo n 12.13.1
```

### SAMをインストール
```
$ brew tap aws/tap
$ brew install aws-sam-cli
$ sam --version
SAM CLI, version 0.32.0

# sam init
👉  n2-slackbot (master *) $ sam init --runtime nodejs12.x
Which template source would you like to use?
        1 - AWS Quick Start Templates
        2 - Custom Template Location
Choice: 1

Project name [sam-app]: 

Quick start templates may have been updated. Do you want to re-download the latest [Y/n]: y

-----------------------
Generating application:
-----------------------
Name: sam-app
Runtime: nodejs12.x
Dependency Manager: npm
Application Template: hello-world
Output Directory: .

Next steps can be found in the README file at ./sam-app/README.md
```

### デプロイ
```
$ aws s3 mb s3://sam-app-turtorial
$ sam package \
  --output-template-file packaged.yaml \
  --s3-bucket sam-app-turtorial

$ sam deploy \
    --template-file packaged.yaml \
    --stack-name sam-app \
    --capabilities CAPABILITY_IAM

```

