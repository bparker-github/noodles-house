import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';
import { asSafeResponseHandler } from '../../lib/safeResponseHandler';

export async function CreateTask(
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

app.http('Tasks_Create', {
  methods: ['POST'],
  authLevel: 'function',
  route: 'tasks/create',
  handler: asSafeResponseHandler(CreateTask),
});
