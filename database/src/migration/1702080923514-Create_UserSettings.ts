import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserSettings1702080923514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(new Table({
    //     name: 'UserSettings',
    // }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
