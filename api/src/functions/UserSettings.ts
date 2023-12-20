import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { UserSettings } from '../database/entity/UserSettings';

export async function TestUserSettings(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`TestUserSettings called.`);

  if (!request.user) {
    return { status: 401 };
  }

  const noodleDb = await getNoodleDb();
  context.debug(`Summoned the db: ${noodleDb.isInitialized}`);

  const found = await noodleDb.manager.findOneBy(UserSettings, { userId: request.user.id });

  return { status: 200, body: JSON.stringify(found ?? UserSettings.Default(request.user.id)) };
}

app.http('TestUserSettings', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'settings/test',
  handler: TestUserSettings,
});
