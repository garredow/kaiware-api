/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('person')
    .del()
    .then(function () {
      return knex('person').insert([
        {
          id: 1,
          name: 'Garrett Downs',
        },
        {
          id: 2,
          name: 'Person2',
        },
      ]);
    });
};
