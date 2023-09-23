import { HttpRequest, InvocationContext, app, type HttpResponseInit } from '@azure/functions';

export async function TestFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';

  return { body: `Hello, ${name}!` };
}

app.http('TestFunction', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: TestFunction,
});