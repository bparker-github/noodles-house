import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';

export async function SyncDb(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`Synchronizing Database | ${request.user}`);

  const noodleDb = await getNoodleDb();

  try {
    await noodleDb.synchronize();
    context.debug('Manually synchronized the database');
    return { status: 201 };
  } catch (ex) {
    context.error('Failed to synchronize:', ex);
    return { status: 204 };
  }
}
app.http('Database_Sync', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'database/sync',
  handler: SyncDb,
});
