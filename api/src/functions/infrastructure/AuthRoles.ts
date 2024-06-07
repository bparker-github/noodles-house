import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { NoodleUserRole } from '@nh/shared';

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
      roles: [NoodleUserRole.ADMIN, 'quantum'],
    },
  };
}

app.http('Auth_GetRoles', {
  methods: ['POST'],
  authLevel: 'function',
  route: 'auth/roles',
  handler: GetRoles,
});
