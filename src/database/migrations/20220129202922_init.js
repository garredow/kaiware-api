/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const ON_UPDATE_TIMESTAMP_FUNCTION = `
    CREATE OR REPLACE FUNCTION on_update_timestamp()
    RETURNS trigger AS $$
    BEGIN
      NEW.updated_at = EXTRACT (EPOCH FROM now()::timestamp)::float*1000;
      RETURN NEW;
    END;
  $$ language 'plpgsql';
  `;

  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);

  const autoUpdate = (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;

  await knex.schema
    .hasTable('users')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('users', (table) => {
          table.string('id').unique().index().primary();
          table.string('name');
          table.string('email');
          table.string('avatar_url');
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('users')));
    })
    .catch((err) => console.error(`Failed to create ${'users'}`, err?.message));

  await knex.schema
    .hasTable('category')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('category', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.string('name');
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('category')));
    })
    .catch((err) => console.error(`Failed to create ${'category'}`, err?.message));

  await knex.schema
    .hasTable('person')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('person', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.string('name');
          table.string('email').nullable();
          table.string('web_url').nullable();
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('person')));
    })
    .catch((err) => console.error(`Failed to create ${'person'}`, err?.message));

  await knex.schema
    .hasTable('app')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('app', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.string('name');
          table.string('description').nullable();
          table.string('icon_url').nullable();
          table.specificType('screenshot_urls', 'text ARRAY').defaultTo('{}');
          table.string('repo_url').nullable();
          table.string('license').nullable();
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('app')));
    })
    .catch((err) => console.error(`Failed to create ${'app'}`, err?.message));

  await knex.schema
    .hasTable('app_author_map')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('app_author_map', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.integer('app_id').index();
          table.integer('person_id').index();
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('app_author_map')));
    })
    .catch((err) => console.error(`Failed to create ${'app_author_map'}`, err?.message));

  await knex.schema
    .hasTable('app_maintainer_map')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('app_maintainer_map', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.integer('app_id').index();
          table.integer('person_id').index();
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('app_maintainer_map')));
    })
    .catch((err) => console.error(`Failed to create ${'app_maintainer_map'}`, err?.message));

  await knex.schema
    .hasTable('app_category_map')
    .then((exists) => {
      if (exists) return;
      return knex.schema
        .createTable('app_category_map', (table) => {
          table.bigInteger('id').unique().index().primary();
          table.integer('app_id').index();
          table.integer('category_id').index();
          table.bigInteger('created_at').defaultTo(new Date().valueOf());
          table.bigInteger('updated_at').defaultTo(new Date().valueOf());
        })
        .then(() => knex.raw(autoUpdate('app_category_map')));
    })
    .catch((err) => console.error(`Failed to create ${'app_category_map'}`, err?.message));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('app'),
    knex.schema.dropTable('category'),
    knex.schema.dropTable('person'),
    knex.schema.dropTable('user'),
  ]);
};
