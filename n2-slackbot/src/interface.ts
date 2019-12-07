import { WebAPICallResult } from "@slack/web-api";

export interface EventApiRequest {
  event: {
    /** 投稿内容 */
    text: string;
    /** イベント内容 */
    type: string;
    /** イベントのサブ */
    subtype?: string;
    /** botが投稿される場合に入ってくる */
    bot_id?: string;
    /** 投稿されたチャンネルID */
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

export interface Anniversary {
  /** 記念日の内容 */
  text: string;
  /** 記念日(YYYY/MM/DD) */
  date: string;
}
