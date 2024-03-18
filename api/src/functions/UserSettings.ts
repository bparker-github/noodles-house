import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { UserSettings } from '../database/entity/UserSettings';
import { NoodleError, asSafeResponseHandler } from '../lib/safeResponseHandler';

export async function GetUserSettings(
  request: HttpRequest,
  context: InvocationContext
): Promise<UserSettings> {
  const userId = request.user?.id;
  context.debug(`Getting User Settings for ${userId}`);

  if (!userId) {
    context.warn('Attempting to get settings without user');
    throw new NoodleError(401, 'Cannot get settings without user.');
  }

  const noodleDb = await getNoodleDb();
  const found = await noodleDb.manager.findOneBy(UserSettings, { id: userId });

  context.debug(`Returning ${!found ? 'empty' : 'found'} User Settings for ${userId}`);
  return found ?? UserSettings.Default(userId);
}
app.http('UserSettings_GetMy', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'settings',
  handler: asSafeResponseHandler(GetUserSettings),
});
