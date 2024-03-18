import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { NoodleUserRole } from '@db/models/NoodleAuth';
import { asSafeResponseHandler } from '../../lib/safeResponseHandler';

export async function GetRoles(
  request: HttpRequest,
  context: InvocationContext
): Promise<NoodleUserRole[]> {
  context.debug(`Getting Roles for user ${request.user}`);

  return [NoodleUserRole.AUTHENTICATED, NoodleUserRole.ANONYMOUS];
}
app.http('Auth_GetRoles', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'auth/roles',
  handler: asSafeResponseHandler(GetRoles),
});
