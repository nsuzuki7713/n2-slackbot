export async function lambdaHandler(event: any, context: any): Promise<any> {
  console.log(event);
  console.log(context);
  const body = JSON.parse(event.body);
  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        challenge: body.challenge
      })
    };

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
