#!/bin/sh

yarn build

aws s3 mb s3://n2-slackbot

sam package \
  --output-template-file packaged.yaml \
  --s3-bucket n2-slackbot

sam deploy \
  --template-file packaged.yaml \
  --stack-name n2-slackbot-app \
  --capabilities CAPABILITY_IAM

aws cloudformation describe-stacks \
  --stack-name n2-slackbot-app \
  --query 'Stacks[].Outputs[?OutputKey==`N2SlackbotApi`]' \
  --output table