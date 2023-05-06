import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quotes extends BaseSchema {
  protected tableName = 'quotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.integer('price').unsigned().notNullable();
      table.uuid('job_id').references('id').inTable('jobs');
      table.string('comment');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
