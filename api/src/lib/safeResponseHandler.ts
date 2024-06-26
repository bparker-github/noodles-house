import { HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export type FuncHandler = (req: HttpRequest, con: InvocationContext) => Promise<HttpResponseInit>;
export type SafeFuncHandler<T> = (req: HttpRequest, con: InvocationContext) => Promise<T | void>;

export async function safeResponseHandler<T>(
  request: HttpRequest,
  context: InvocationContext,
  action: SafeFuncHandler<T>,
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

export const useSafeResponseHandler = <T>(
  action: SafeFuncHandler<T>,
  status = 200
): FuncHandler => {
  return (r: HttpRequest, c: InvocationContext) => safeResponseHandler(r, c, action, status);
};

export class NoodleError extends Error {
  public status: number;

  constructor(desiredStatus?: number, message?: string) {
    super(message);
    this.status = desiredStatus ?? 500;
  }
}
