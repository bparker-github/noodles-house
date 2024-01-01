import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { TodoTask } from '../database/entity/TodoTask';

export async function CreateTodoTask(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`Create Todo Task`);
  const noodleDb = await getNoodleDb();

  try {
    const theBody = await request.json();
    context.debug(`Task Body: ${theBody}`);

    const saved = noodleDb.manager.create<TodoTask>(TodoTask, theBody);
    await noodleDb.manager.save(saved);

    return { status: 201, jsonBody: saved };
  } catch (ex) {
    context.error('Failed to create Todo Task:', ex);
    return { status: 500, jsonBody: ex };
  }
}

app.http('POST_TodoTask', {
  methods: ['POST'],
  authLevel: 'function',
  route: 'todo/create',
  handler: CreateTodoTask,
});
