import { initialize, anniversaries } from '../../src/config';
import { createAnniversaryMessage, createGarbageMessage } from '../../src/modules/messages';

describe('messages.tsのUT', () => {
  beforeEach(() => {
    initialize();
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2020/01/10').getTime());
  });
  describe('createAnniversaryMessage()', () => {
    // gitHub Actiontsの確認のため、skip
    it.skip('正しいmessageを作成する', () => {
      const expectMessages = [];
      expectMessages.push(`${anniversaries[0].text}(${anniversaries[0].date}): 8年1ヶ月25日`);
      expectMessages.push(`${anniversaries[1].text}(${anniversaries[1].date}): 2年10ヶ月18日`);
      expectMessages.push(`${anniversaries[2].text}(${anniversaries[2].date}): 2年5ヶ月16日`);
      expectMessages.push(`${anniversaries[3].text}(${anniversaries[3].date}): 27年0ヶ月0日`);
      expectMessages.push(`${anniversaries[4].text}(${anniversaries[4].date}): 27年0ヶ月19日`);
      expectMessages.push(`${anniversaries[5].text}(${anniversaries[5].date}): 4年9ヶ月9日`);
      expectMessages.push(`${anniversaries[6].text}(${anniversaries[6].date}): 1年4ヶ月13日`);

      const res = createAnniversaryMessage();
      expect(expectMessages.join(`\n`)).toBe(res);
    });
  });

  describe('createGarbageMessage()', () => {
    it('正しいmessageを作成する', () => {
      const expectMessages = [];
      expectMessages.push(`燃やさないゴミは0日後の1/10`);
      expectMessages.push(`ペットボトルは1日後の1/11`);
      expectMessages.push(`古紙・ビンカンゴミは12日後の1/22`);
      expectMessages.push(`https://www.city.arakawa.tokyo.jp/a025/moyasugomi-moyasanaigomi-dasikata.html`);

      const res = createGarbageMessage();
      console.log(res);
      expect(expectMessages.join(`\n`)).toBe(res);
    });
  });
});
