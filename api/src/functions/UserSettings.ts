import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function TestUserSettings(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`TestUserSettings called.`);
  return { status: 200, body: JSON.stringify(request.user) };
}

app.http('TestUserSettings', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'settings/test',
  handler: TestUserSettings,
});
