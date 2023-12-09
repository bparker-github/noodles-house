import { getNoodleDb } from './data-source';
import { TestModel } from './entity/Test';

async function RunTest() {
  console.debug('Startup executing:');
  const NoodleDb = await getNoodleDb();

  await NoodleDb.initialize();
  console.debug('Initialize complete!');

  const newTest = new TestModel();
  newTest.age = 10;
  newTest.firstName = 'Foo';
  newTest.lastName = 'Bar';

  console.debug('Saving new model:', newTest);
  await NoodleDb.manager.save(newTest);
  console.debug('Saved as:', newTest);
}

// Then execute function.
RunTest();
