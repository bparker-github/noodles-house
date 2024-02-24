import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';
import { safeResponseHandler } from '../../lib/safeResponseHandler';

export async function getMyTasks(
  request: HttpRequest,
  context: InvocationContext
): Promise<TodoTaskModel[]> {
  context.debug(`Getting Tasks for specific user`);
  const noodleDb = await getNoodleDb();

  const userId = request.user?.id;
  if (!userId) {
    throw new Error('Cannot get tasks without user.');
  }

  return await noodleDb.manager.findBy(TodoTaskModel, { createdBy: userId });
}

app.http('GET_GetMyTasks', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'tasks',
  handler: (r, c) => safeResponseHandler(r, c, getMyTasks),
});