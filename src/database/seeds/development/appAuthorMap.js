/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('app_author_map')
    .del()
    .then(function () {
      return knex('app_author_map').insert([
        {
          id: 1,
          person_id: 1,
          app_id: 1,
        },
        {
          id: 2,
          person_id: 1,
          app_id: 2,
        },
        {
          id: 3,
          person_id: 2,
          app_id: 3,
        },
      ]);
    });
};
