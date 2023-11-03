import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { AuthConfig } from '../lib/auth';

export async function KimberlyPetricia(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';

  const configVal = new AuthConfig();

  return { body: `Hello, ${name}! Config val: ${JSON.stringify(configVal, null, 2)}` };
}

app.http('KimberlyPetricia', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: KimberlyPetricia,
});
