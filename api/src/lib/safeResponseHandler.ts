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
      status: err instanceof NoodleError ? err.status : 500,
      jsonBody: Object.assign({ nhMessage: 'Error executing ' + action.name ?? 'function' }, err),
    };
  }
}

export class NoodleError extends Error {
  public status: number;

  constructor(desiredStatus?: number, message?: string) {
    super(message);
    this.status = desiredStatus ?? 500;
  }
}
