/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('release')
    .del()
    .then(function () {
      return knex('release').insert([
        {
          id: 1,
          app_id: 1,
          version: '1.0.0',
          download_url: 'https://',
        },
        {
          id: 2,
          app_id: 1,
          version: '1.1.0',
          download_url: 'https://',
        },
        {
          id: 3,
          app_id: 1,
          version: '1.2.0',
          download_url: 'https://',
        },
      ]);
    });
};
