import {lambdaHandler} from '../src/handler';

describe('handler', (): void => {
    test('test lambdaHandler', async (): Promise<any> => {
        const response: any = await lambdaHandler('Tom','hell');
        expect(response.statusCode).toBe(200);
    });
})