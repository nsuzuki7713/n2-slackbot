import { lambdaHandler, createText } from "../src/handler";

// describe("handler", (): void => {
//   test("test lambdaHandler", async (): Promise<any> => {
//     const response: any = await lambdaHandler({"Tom"});
//     expect(response.statusCode).toBe(200);
//   });
// });

describe.only("createText", (): void => {
  it("test lambdaHandler", () => {
    console.log(createText("結婚記念日", "2015/07/25"));
  });
});
