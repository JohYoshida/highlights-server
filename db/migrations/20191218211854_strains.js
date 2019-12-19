
exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("strains"),
    knex.schema.createTable("strains", table => {
      table.uuid("id").primary();
      table.string("name");
      table.string("type");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("strains"),
  ]);
};
