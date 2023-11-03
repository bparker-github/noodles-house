import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { AuthConfig } from '@noodles-house/common';

export async function GetAuthConfig(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  const configVal = new AuthConfig();

  return { body: JSON.stringify(configVal) };
}

app.http('GetAuthConfig', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: GetAuthConfig,
});
