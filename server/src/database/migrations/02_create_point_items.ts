import Knex from 'knex'; // tipos do ts sao em letra maiuscula

export async function up(knex: Knex){
    // Criar a tabela
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items'); 
    });
}

export async function down(knex:Knex){
    // rollback -- deleta a tabela criada
    return knex.schema.dropTable('point_items');
}