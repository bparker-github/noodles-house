import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { getNoodleDb } from '../../../database/src';

export async function DbInit(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`ApiTest called.`);

  const NoodleDb = await getNoodleDb();

  context.log('ApiTest db:', NoodleDb);

  return { status: 200 };
}

app.http('ApiTest', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'db/init',
  handler: DbInit,
});
