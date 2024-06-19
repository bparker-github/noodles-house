import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';
import { NoodleError, safeResponseHandler } from '../../lib/safeResponseHandler';

export async function GetMyTasksCount(
  request: HttpRequest,
  context: InvocationContext
): Promise<number> {
  context.debug(`Getting Tasks Count for specific user`);
  const noodleDb = await getNoodleDb();

  const userId = request.user?.id;
  if (!userId) {
    throw new NoodleError(401, 'Cannot get tasks without user.');
  }

  return noodleDb.manager.count(TodoTaskModel, {
    cache: { id: userId, milliseconds: 5 * 60 * 1000 },
  });
}

app.http('Tasks_GetMyCount', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'tasks/count',
  handler: (r, c) => safeResponseHandler(r, c, GetMyTasksCount),
});
