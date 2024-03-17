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

type UnsplashApi = ReturnType<typeof createApi>;
let unsplashApi: UnsplashApi | null = null;
function getUnsplashApi() {
  const accessKey = process.env.NOOD_UNSPLASH_ACCESS_KEY ?? '';
  return (unsplashApi ??= createApi({ accessKey: accessKey }));
}

async function handlePhotosRequest(
  request: HttpRequest,
  secondary: string,
  rest: string[]
): Promise<HttpResponseInit> {
  if (request.method === 'GET') {
    const resp = await getUnsplashApi().photos.get({ photoId: secondary });
    return { jsonBody: resp.response, status: 200 };
  } else if (request.method === 'POST') {
    return { body: 'Invalid method', status: 400 };
  }

  // Default
  return { body: `Invalid method. Params: ${secondary} ${rest}`, status: 400 };
}

app.http('Unsplash', {
  methods: ['GET'],
  route: 'unsplash/{*restOfPath}',
  authLevel: 'anonymous',
  handler: Unsplash,
});
