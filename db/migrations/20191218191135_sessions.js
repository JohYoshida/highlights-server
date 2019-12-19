exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("sessions"),
    knex.schema.createTable("sessions", table => {
      table.uuid("id").primary();
      table.uuid("product_id");
      table.uuid("purchase_id");
      table.integer("rating");
      table.string("createdAt");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTableIfExists("sessions")]);
};
