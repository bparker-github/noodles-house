import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { NoodleUserRole } from '@db/models/NoodleAuth';
import { asSafeResponseHandler } from '../../lib/safeResponseHandler';

export async function GetRoles(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(
    `Getting Roles for user ${JSON.stringify(request.user)}, body: ${JSON.stringify(request.body)}`
  );

  return {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    jsonBody: {
      roles: [
        NoodleUserRole.AUTHENTICATED,
        NoodleUserRole.ANONYMOUS,
        NoodleUserRole.ADMIN,
        'quantum',
      ],
    },
  };
}

app.post('Auth_GetRoles', {
  authLevel: 'function',
  route: 'auth/roles',
  handler: asSafeResponseHandler(GetRoles),
});
