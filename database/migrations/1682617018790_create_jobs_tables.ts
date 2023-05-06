import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('phone_number').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('state').notNullable();
      table.string('postal_code').notNullable();
      table.string('clothing').notNullable();
      table.text('description').notNullable();
      table.integer('budget').unsigned();
      table.integer('count').unsigned().notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('Open');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
