exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("products"),
    knex.schema.createTable("products", table => {
      table.uuid("id").primary();
      table.uuid("producer_id");
      table.uuid("strain_id");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTableIfExists("products")]);
};
