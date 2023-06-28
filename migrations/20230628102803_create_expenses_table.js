/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
    .createTable('expenses', function (table) {
        table.uuid('id', {primaryKey: true});
        table.date('expense_date').notNullable();
        table.string('title', 100).notNullable();
        table.string('category', 50).notNullable();
        table.string('subcategory', 50).defaultTo("default");
        table.integer('amount').notNullable();
        table.string('payee', 50).defaultTo("default");
        table.timestamps(true, true, false);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
      .dropTable("expenses");
};
