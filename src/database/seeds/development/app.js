/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('app')
    .del()
    .then(function () {
      return knex('app').insert([
        {
          id: 1,
          name: 'Foxcasts Lite',
          description: 'A podcast app',
          icon_url: '',
          screenshot_urls: [],
          repo_url: 'https://github.com/garredow/foxcasts-lite',
          license: 'MIT',
        },
        {
          id: 2,
          name: 'Mica',
          description: 'Another podcast app',
          icon_url: '',
          screenshot_urls: [],
          repo_url: 'https://github.com/garredow/mica',
          license: 'MIT',
        },
        {
          id: 3,
          name: 'OPML Tool',
          description: 'Manage your feeds in an opml file',
          icon_url: '',
          screenshot_urls: [],
          repo_url: 'https://github.com/garredow/opml-tool',
          license: 'MIT',
        },
      ]);
    });
};
