import { app, HttpRequest, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../database/dataSource';
import { TodoTaskModel } from '../../database/entity/TodoTask';
import { safeResponseHandler } from '../../lib/safeResponseHandler';
import { TodoTask } from '@db/models/TodoTask';

export async function editTask(
  request: HttpRequest,
  context: InvocationContext
): Promise<TodoTaskModel> {
  context.debug(`Edit Todo Task`);
  const noodleDb = await getNoodleDb();

  const theBody = await request.json();
  if (!theBody || typeof theBody !== 'object' || !('id' in theBody) || !theBody.id) {
    delete theBody['id'];
  }

  const dto = theBody as TodoTask;

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
  handler: (r, c) => safeResponseHandler(r, c, editTask),
});
