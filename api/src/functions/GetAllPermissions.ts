import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { PermissionList } from '../lib/auth/AuthRecords';

export async function GetAllPermissions(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`GetAllPermissions called.`);

  const ret = [...PermissionList];
  return { body: JSON.stringify(ret) };
}

app.http('GetAllPermissions', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'scheme/permissions',
  handler: GetAllPermissions,
});
