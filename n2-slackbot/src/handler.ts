export async function lambdaHandler(event: any, context: any): Promise<any> {
  try {
    const response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'hello world3',
      })
    }

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}