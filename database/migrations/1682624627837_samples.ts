import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Samples extends BaseSchema {
  protected tableName = 'samples'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.uuid('job_id').references('id').inTable('jobs');
      table.string('file').notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
