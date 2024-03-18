import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { NoodleUserRole } from '@db/models/NoodleAuth';
import { asSafeResponseHandler } from '../../lib/safeResponseHandler';

export async function GetRoles(request: HttpRequest, context: InvocationContext) {
  context.log(`Getting Roles for user ${JSON.stringify(request.user)}`);

  return {
    roles: [
      NoodleUserRole.AUTHENTICATED,
      NoodleUserRole.ANONYMOUS,
      NoodleUserRole.ADMIN,
      'quantum',
    ],
  };
}
app.http('Auth_GetRoles', {
  methods: ['POST', 'GET'],
  authLevel: 'function',
  route: 'auth/roles',
  handler: asSafeResponseHandler(GetRoles),
});
