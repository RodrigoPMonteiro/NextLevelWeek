import Knex from 'knex'; // tipos do ts sao em letra maiuscula

export async function up(knex: Knex){
    // Criar a tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex:Knex){
    // rollback -- deleta a tabela criada
    return knex.schema.dropTable('items');
}