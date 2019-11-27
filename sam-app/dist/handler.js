"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function lambdaHandler(event, context) {
    try {
        const response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world3',
            })
        };
        return response;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=handler.js.map