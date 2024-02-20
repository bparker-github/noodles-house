import { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function safeResponseHandler<T>(
  request: HttpRequest,
  context: InvocationContext,
  action: (request: HttpRequest, context: InvocationContext) => Promise<T | void>,
  status = 200
): Promise<HttpResponseInit> {
  try {
    const ret = await action(request, context);
    return { status, jsonBody: ret };
  } catch (err) {
    return {
      status: 500,
      jsonBody: Object.assign({ nhMessage: 'Error executing ' + action.name ?? 'function' }, err),
    };
  }
}
