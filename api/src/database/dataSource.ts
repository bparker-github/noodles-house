// Ensure the config files are loaded.
import 'reflect-metadata';

import { config } from 'dotenv';
config({ path: '../.env' });

import { DataSource } from 'typeorm';
import { UserSettings } from './entity/UserSettings';
import { TodoTaskModel } from './entity/TodoTask';

let loadedDb: DataSource;
export async function getNoodleDb(): Promise<DataSource> {
  return (
    loadedDb ??
    (await new DataSource({
      type: 'mssql',
      host: process.env.NOOD_DB_URL,
      database: process.env.NOOD_DB_DATABASE,
      username: process.env.NOOD_DB_USER,
      password: process.env.NOOD_DB_PASS,
      port: 1433,
      connectionTimeout: 30e3,
      synchronize: false,
      logging: true,
      entities: [UserSettings, TodoTaskModel],
      migrations: [],
    }).initialize())
  );
}
