import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function Unsplash(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';

  return { body: `Hello, ${name}!` };
}

app.http('unsplash', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: Unsplash,
});
