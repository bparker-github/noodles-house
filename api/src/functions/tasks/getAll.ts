import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';

export async function getMyTasks(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`Getting Tasks for specific user`);
  const noodleDb = await getNoodleDb();

  const userId = request.user?.id;
  if (!userId) {
    return { status: 500, body: 'Cannot get tasks without user.' };
  }

  try {
    const foundTasks = noodleDb
      .getRepository<TodoTaskModel>(TodoTaskModel)
      .findBy({ createdBy: userId });

    return { status: 200, jsonBody: foundTasks };
  } catch (err) {
    return { status: 500, jsonBody: Object.assign({ nhMsg: 'Failed to getAllTasks' }, err) };
  }
}

app.http('GET_GetMyTasks', {
  methods: ['GET'],
  authLevel: 'function',
  route: 'tasks',
  handler: getMyTasks,
});
