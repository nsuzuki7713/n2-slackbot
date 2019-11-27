#!/bin/sh

yarn build

sam package \
  --output-template-file packaged.yaml \
  --s3-bucket sam-app-turtorial

sam deploy \
  --template-file packaged.yaml \
  --stack-name sam-app \
  --capabilities CAPABILITY_IAM

aws cloudformation describe-stacks \
  --stack-name sam-app \
  --query 'Stacks[].Outputs[?OutputKey==`HelloWorldApi`]' \
  --output table