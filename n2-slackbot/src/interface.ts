import { WebAPICallResult } from "@slack/web-api";

export interface EventApiRequest {
  event: {
    text: string;
    type: string;
    subtype?: string;
    bot_id?: string;
    channel: string;
  };
}

export interface Response {
  statusCode: number;
}

export interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    text: string;
  };
}
