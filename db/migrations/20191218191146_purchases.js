exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("purchases"),
    knex.schema.createTable("purchases", table => {
      table.uuid("id").primary();
      table.uuid("product_id");
      table.string("moisture");
      table.string("density");
      table.string("size");
      table.string("amount");
      table.string("createdAt");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTableIfExists("purchases")]);
};
