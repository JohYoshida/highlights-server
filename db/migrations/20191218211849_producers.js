
exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("producers"),
    knex.schema.createTable("producers", table => {
      table.uuid("id").primary();
      table.string("name");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("producers"),
  ]);
};
