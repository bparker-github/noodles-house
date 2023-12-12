import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../database/dataSource';
import { TestModel } from '../database/entity/TestModel';

export async function DbInit(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.debug(`Database Test called.`);
  const NoodleDb = await getNoodleDb();

  const newTest = new TestModel();
  newTest.age = 10;
  newTest.firstName = 'Foo';
  newTest.lastName = 'Bar';

  console.debug('Saving new model:', newTest);
  await NoodleDb.manager.save(newTest);
  console.debug('Saved as:', newTest);

  return { status: 201, body: JSON.stringify(newTest) };
}

app.http('DatabaseTest', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'db/test',
  handler: DbInit,
});
