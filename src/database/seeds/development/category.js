/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('category')
    .del()
    .then(function () {
      return knex('category').insert([
        { id: 1, name: 'Communication' },
        { id: 2, name: 'Education' },
        { id: 3, name: 'Games' },
        { id: 4, name: 'Health' },
        { id: 5, name: 'Multimedia' },
        { id: 6, name: 'News' },
        { id: 7, name: 'Search' },
        { id: 8, name: 'Social' },
        { id: 9, name: 'Travel' },
        { id: 10, name: 'Utility' },
      ]);
    });
};
