import { HttpRequest, InvocationContext, app, type HttpResponseInit } from '@azure/functions';


export async function Unsplash(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  context.debug(
    'UnsplashRequest:\n\tQuery:',
    request.query,
    '\n\tParams:',
    request.params,
    '\n\tBody:',
    await request.json().catch((er) => er?.message ?? er),
    '\n\tUrl:',
    request.url
  );
  const name = request.query.get('name') || (await request.text()) || 'world';

  const unsplashApi = 

  return { body: `Hello, ${name}!` };
}

app.http('unsplash', {
  methods: ['GET'],
  route: 'unsplash/{*restOfPath}',
  authLevel: 'anonymous',
  handler: Unsplash,
});
