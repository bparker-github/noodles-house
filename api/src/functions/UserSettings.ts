import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { UserSettings } from '../database/entity/UserSettings';

export async function GetUserSettings(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const userId = request.user?.id;
  context.debug(`Getting User Settings for ${userId}`);

  if (!userId) {
    context.warn('Attempting to get settings without user');
    return { status: 401, body: 'Cannot get settings without user.' };
  }

  const noodleDb = await getNoodleDb();
  const found = await noodleDb.manager.findOneBy(UserSettings, { id: userId });

  context.debug(`Returning ${!found ? 'empty' : 'found'} User Settings for ${userId}`);
  return { status: 200, jsonBody: found ?? UserSettings.Default(userId) };
}
app.http('Get_UserSettings', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'settings',
  handler: GetUserSettings,
});
