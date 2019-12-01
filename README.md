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

$ aws cloudformation describe-stacks \
    --stack-name sam-app \
    --query 'Stacks[].Outputs[?OutputKey==`HelloWorldApi`]' \
    --output table
```

### TypeScript導入
https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49
```
$ yarn init
# typeScripのinstall
$ yarn add -D typescript @types/node
# tsconfig.json 生成
$ npx tsc --init
# ts-nodeをinstall
$ yarn add -D ts-node
# rimraf npm-run-allのinstall
$ yarn add -D rimraf npm-run-all
```

### Jest導入
```
$ yarn add jest ts-jest @types/jest -D
```

### ESLint
https://github.com/notakaos/typescript-node-base-with-eslint-prettier

https://qiita.com/suzuki_sh/items/fe9b60c4f9e1dbc5d903

```
# esint
$ yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
# prettier
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

vscodeでESLintのプラグインを入れる