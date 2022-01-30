/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('app_category_map')
    .del()
    .then(function () {
      return knex('app_category_map').insert([
        {
          id: 1,
          app_id: 1,
          category_id: 5,
        },
        {
          id: 2,
          app_id: 2,
          category_id: 5,
        },
        {
          id: 3,
          app_id: 3,
          category_id: 10,
        },
      ]);
    });
};
