import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { RoleList } from '../lib/auth/AuthRecords';

export async function GetAllRoles(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`GetAllRoles called.`);

  const ret = [...RoleList];
  return { body: JSON.stringify(ret) };
}

app.http('roles', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: GetAllRoles,
});
