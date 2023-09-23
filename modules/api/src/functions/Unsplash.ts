import { HttpRequest, InvocationContext, app, type HttpResponseInit } from '@azure/functions';
import { createApi } from 'unsplash-js';

export async function Unsplash(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('found rest::', request.params.restOfPath);
  const pathParts = request.params.restOfPath?.split('/');
  const [domain, secondary, ...rest] = pathParts;

  switch (domain) {
    case 'photos':
      // Do photos thing.
      return handlePhotosRequest(request, secondary, rest);
    default:
      return { body: 'Invalid command.', status: 400 };
  }
}

let unsplashApi: ReturnType<typeof createApi> | null = null;
function getUnsplashApi() {
  const accessKey = process.env.NOOD_UNSPLASH_ACCESS_KEY ?? '';
  return (unsplashApi ??= createApi({ accessKey }));
}

async function handlePhotosRequest(
  request: HttpRequest,
  secondary: string,
  rest: string[]
): Promise<HttpResponseInit> {
  switch (request.method) {
    case 'GET':
      const resp = await getUnsplashApi().photos.get({ photoId: secondary });
      return { jsonBody: resp.response, status: 200 };
    case 'POST':
    default:
      return { body: 'Invalid method', status: 400 };
  }
}

app.http('unsplash', {
  methods: ['GET'],
  route: 'unsplash/{*restOfPath}',
  authLevel: 'anonymous',
  handler: Unsplash,
});
