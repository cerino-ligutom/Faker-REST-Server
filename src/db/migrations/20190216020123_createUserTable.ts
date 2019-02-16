import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table.string('id').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username').notNullable();
    table.string('email');
    table.string('avatarUrl');
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table.string('hash').notNullable();
    table.string('salt').notNullable();
    table.unique(['username']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('users');
}
