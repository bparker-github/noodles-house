import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';
import { safeResponseHandler } from '../../lib/safeResponseHandler';

export async function createTask(
  request: HttpRequest,
  context: InvocationContext
): Promise<TodoTaskModel> {
  context.debug(`Create Todo Task`);
  const noodleDb = await getNoodleDb();

  const theBody = await request.json();
  if (!theBody || typeof theBody !== 'object' || !('id' in theBody) || !theBody.id) {
    delete theBody['id'];
  }

  const asModel = noodleDb.manager.create<TodoTaskModel>(TodoTaskModel, theBody);

  // Assign fixed data via server
  asModel.createdAt = new Date();
  asModel.createdBy = request.user.id;
  asModel.updatedAt = new Date();
  asModel.updatedBy = request.user.id;

  // Log and save the model.
  context.debug('Create Task Body:', theBody, asModel);
  await asModel.save();

  return asModel;
}

app.http('POST_CreateTask', {
  methods: ['POST'],
  authLevel: 'function',
  route: 'tasks/create',
  handler: (r, c) => safeResponseHandler(r, c, createTask),
});
