import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { TodoTaskModel } from '../database/entity/TodoTask';

export async function CreateTodoTask(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`Create Todo Task`);
  const noodleDb = await getNoodleDb();

  try {
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

    return { status: 201, jsonBody: asModel };
  } catch (ex) {
    context.error('Failed to create Todo Task:', ex);
    return { status: 500, jsonBody: ex };
  }
}

app.http('POST_TodoTask', {
  methods: ['POST'],
  authLevel: 'function',
  route: 'tasks/create',
  handler: CreateTodoTask,
});
