import { HttpRequest, InvocationContext, app } from '@azure/functions';
import { createApi } from 'unsplash-js';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import { NoodleError, asSafeResponseHandler } from '../lib/safeResponseHandler';

export async function Unsplash(request: HttpRequest, context: InvocationContext): Promise<Full> {
  context.log('found rest::', request.params.restOfPath);
  const pathParts = request.params.restOfPath?.split('/');
  const [domain, secondary, ...rest] = pathParts;

  switch (domain) {
    case 'photos':
      // Do photos thing.
      return handlePhotosRequest(request, secondary, rest);
    default:
      throw new NoodleError(400, 'Invalid command');
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
): Promise<Full> {
  if (request.method === 'GET') {
    const resp = await getUnsplashApi().photos.get({ photoId: secondary });
    return resp.response;
  } else if (request.method === 'POST') {
    throw new NoodleError(400, 'Invalid method');
  }

  // Default
  throw new NoodleError(400, `Invalid method. Params: ${secondary} ${rest}`);
}

app.http('Unsplash', {
  methods: ['GET'],
  route: 'unsplash/{*restOfPath}',
  authLevel: 'anonymous',
  handler: asSafeResponseHandler(Unsplash),
});
