import { HttpRequest, InvocationContext, app, type HttpResponseInit } from '@azure/functions';

export async function Unsplash(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const { doGetOrThrow, useUnsplashApi } = await import('@nh/shared');

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

  const accessKey = doGetOrThrow(
    () => process.env['NOOD_UNSPLASH_ACCESS_KEY'],
    'Missing Unsplash Access Key'
  );
  const unsplashApi = useUnsplashApi('api', accessKey);

  const firstPath = request.params.restOfPath?.split('/');
  context.log('firstPath:', firstPath);

  return { body: `Hello, ${firstPath}!` };
}

app.http('unsplash', {
  methods: ['GET'],
  route: 'unsplash/{*restOfPath}',
  authLevel: 'anonymous',
  handler: Unsplash,
});
