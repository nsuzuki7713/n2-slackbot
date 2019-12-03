import { lambdaHandler, createText } from "../src/handler";
import { Anniversary } from "../src/interface";
require("dotenv").config();

// describe("handler", (): void => {
//   test("test lambdaHandler", async (): Promise<any> => {
//     const response: any = await lambdaHandler({"Tom"});
//     expect(response.statusCode).toBe(200);
//   });
// });

describe.only("createText", (): void => {
  it("test lambdaHandler", async () => {
    const anniversaries: Anniversary[] = [
      {
        text: process.env.ANNIVERSARY_TEXT1 as string,
        date: process.env.ANNIVERSARY_DATE1 as string
      },
      {
        text: process.env.ANNIVERSARY_TEXT2 as string,
        date: process.env.ANNIVERSARY_DATE2 as string
      },
      {
        text: process.env.ANNIVERSARY_TEXT3 as string,
        date: process.env.ANNIVERSARY_DATE3 as string
      },
      {
        text: process.env.ANNIVERSARY_TEXT4 as string,
        date: process.env.ANNIVERSARY_DATE4 as string
      },
      {
        text: process.env.ANNIVERSARY_TEXT5 as string,
        date: process.env.ANNIVERSARY_DATE5 as string
      }
    ];
    const message = anniversaries.map(anniversary => {
      return createText(anniversary.text, anniversary.date);
    });
    console.log(message.join("\n"));
  });
});
