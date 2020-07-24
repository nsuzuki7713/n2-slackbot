import moment from 'moment';
import 'moment-precise-range-plugin';
import { anniversaries } from '../config';

export function createAnniversaryMessage(): string {
  return anniversaries
    .map(anniversary => {
      const diff = moment.preciseDiff(moment(), moment(anniversary.date, 'YYYY/MM/DD'), true);
      return `${anniversary.text}(${anniversary.date}): ${diff.years}年${diff.months}ヶ月${diff.days}日`;
    })
    .join('\n');
}

export function createGarbageMessage(): string {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const garbageWeek = [2, 4];
  let date = moment().utcOffset('+0900');
  const message = [];
  let count = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const weekCount = Math.floor((date.date() + 6) / 7);
    const weekday = weekdays[date.days()];

    if (garbageWeek.includes(weekCount)) {
      if (weekday === '金') {
        message.push(`燃やさないゴミは${count}日後の${date.format('M/D')}`);
      }
      if (weekday === '水') {
        message.push(`古紙・ビンカンゴミは${count}日後の${date.format('M/D')}`);
      }
      if (weekday === '土') {
        message.push(`ペットボトルは${count}日後の${date.format('M/D')}`);
      }
    }
    if (message.length >= 3) {
      break;
    }
    count++;
    date = date.add(1, 'd');
  }

  message.push('https://www.city.arakawa.tokyo.jp/a025/moyasugomi-moyasanaigomi-dasikata.html');

  return message.join('\n');
}
