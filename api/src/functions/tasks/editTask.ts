// import { app, HttpRequest, InvocationContext } from '@azure/functions';
// import { TodoTask } from '@noodles-house/db';
// import { getNoodleDb } from '../../database/dataSource';
// import { TodoTaskModel } from '../../database/entity/TodoTask';
// import { NoodleError, safeResponseHandler } from '../../lib/safeResponseHandler';

// export async function EditTask(
//   request: HttpRequest,
//   context: InvocationContext
// ): Promise<TodoTaskModel> {
//   context.debug(`Edit Todo Task`);
//   const noodleDb = await getNoodleDb();

//   const theBody = (await request.json()) as TodoTask;
//   if (!('id' in theBody)) {
//     throw new NoodleError(400, 'Invalid Edit body.');
//   }

//   const found = await noodleDb.manager.findOneBy<TodoTaskModel>(TodoTaskModel, { id: theBody.id });
//   if (!found.id || found.id !== theBody.id) {
//     throw new NoodleError(404, 'Cannot edit a non-existent task.');
//   }

//   // Update values that are allowed to be updated.
//   found.title = theBody.title;
//   found.description = theBody.description;
//   found.state = theBody.state;
//   found.subTitle = theBody.state;
//   found.type = theBody.type;

//   // Assign fixed data via server
//   found.updatedAt = new Date();
//   found.updatedBy = request.user.id;

//   // Log and save the model.
//   context.debug('Edit Task Body:', theBody, found);
//   await found.save();

//   return found;
// }

// app.http('Tasks_Create', {
//   methods: ['POST'],
//   authLevel: 'function',
//   route: 'tasks/create',
//   handler: (r, c) => safeResponseHandler(r, c, EditTask),
// });
