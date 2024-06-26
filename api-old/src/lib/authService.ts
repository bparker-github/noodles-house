import { HttpRequest } from '@azure/functions';
import { NoodleUserRole } from '../shared';
import { NoodleError } from './safeResponseHandler';

export const useAuthGuard = (request: HttpRequest, role: NoodleUserRole) => {
  if (!request.user?.id) {
    throw new NoodleError(401, 'Cannot find user');
  }
  console.log('Getting auth guard:', role);
};
