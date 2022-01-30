import knex from 'knex';
import _ from 'lodash';
import pg from 'pg';
import { config } from '../lib/config';
import {
  App,
  AppAuthorMap,
  AppCategoryMap,
  AppMaintainerMap,
  Category,
  Person,
  User,
} from '../models';
import {
  DbApp,
  DbAppAuthorMap,
  DbAppCategoryMap,
  DbAppMaintainerMap,
  DbCategory,
  DbPerson,
  DbUser,
} from './models';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => {
  return parseInt(value);
});

enum Table {
  App = 'app',
  AppAuthorMap = 'app_author_map',
  AppCategoryMap = 'app_category_map',
  AppMaintainerMap = 'app_maintainer_map',
  Category = 'category',
  Maintainer = 'maintainer',
  Person = 'person',
  User = 'user',
}

export class Database {
  private db;

  constructor() {
    this.db = knex({
      client: 'pg',
      connection: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
      },
    });
  }

  // App

  app = {
    getById: (id: number): Promise<App | undefined> => {
      return this.db<DbApp>(Table.App)
        .where({ id })
        .first()
        .then((res) => toCamelCase(res));
    },
    getByIds: (ids: number[]): Promise<App[]> => {
      return this.db<DbApp>(Table.App)
        .whereIn('id', ids)
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getByCategoryId: async (categoryId: number): Promise<App[]> => {
      const res = await this.db
        .select('app.*')
        .from('app_category_map as cat')
        .join('app', 'app.id', 'cat.app_id')
        .where({ 'cat.category_id': categoryId })
        .then((res) => res.map((a) => toCamelCase<App>(a)));

      return res;
    },
    getByPersonId: async (personId: number): Promise<App[]> => {
      const res = await this.db
        .select('app.*')
        .from(Table.App)
        .innerJoin(Table.AppAuthorMap, 'app.id', `${Table.AppAuthorMap}.app_id`)
        .innerJoin(Table.AppMaintainerMap, 'app.id', `${Table.AppMaintainerMap}.app_id`)
        .where({
          [`${Table.AppAuthorMap}.person_id`]: personId,
          [`${Table.AppMaintainerMap}.person_id`]: personId,
        })
        .then((res) => res.map((a) => toCamelCase<App>(a)));

      console.log('getByPersonId', res);

      return res;
    },
  };

  appAuthorMap = {
    getAllByPersonId: async (personId: number): Promise<AppAuthorMap[]> => {
      return this.db<DbAppAuthorMap>(Table.AppAuthorMap)
        .where({ person_id: personId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getAllByAppId: async (appId: number): Promise<AppAuthorMap[]> => {
      return this.db<DbAppAuthorMap>(Table.AppAuthorMap)
        .where({ app_id: appId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
  };

  appCategoryMap = {
    getAllByCategoryId: async (categoryId: number): Promise<AppCategoryMap[]> => {
      return this.db<DbAppCategoryMap>(Table.AppCategoryMap)
        .where({ category_id: categoryId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getAllByAppId: async (appId: number): Promise<AppCategoryMap[]> => {
      return this.db<DbAppCategoryMap>(Table.AppCategoryMap)
        .where({ app_id: appId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
  };

  appMaintainerMap = {
    getAllByPersonId: async (personId: number): Promise<AppMaintainerMap[]> => {
      return this.db<DbAppMaintainerMap>(Table.AppMaintainerMap)
        .where({ person_id: personId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getAllByAppId: async (appId: number): Promise<AppMaintainerMap[]> => {
      return this.db<DbAppMaintainerMap>(Table.AppMaintainerMap)
        .where({ app_id: appId })
        .then((res) => res.map((a) => toCamelCase(a)));
    },
  };

  // Category

  category = {
    getById: (id: number): Promise<Category | undefined> => {
      return this.db<DbCategory>(Table.Category)
        .where({ id })
        .first()
        .then((res) => (res ? toCamelCase(res) : res));
    },
    getByIds: (ids: number[]): Promise<Category[]> => {
      return this.db<DbCategory>(Table.Category)
        .whereIn('id', ids)
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getAll: (): Promise<Category[]> => {
      return this.db<DbCategory>(Table.Category).then((res) => res.map((a) => toCamelCase(a)));
    },
    getByAppId: (appId: number): Promise<Category[]> => {
      return this.db
        .select('cat.*')
        .from('category as cat')
        .join('app_category_map', 'cat.id', 'app_category_map.category_id')
        .where({ 'app_category_map.app_id': appId })
        .then((res) => res.map((a) => toCamelCase<App>(a)));
    },
  };

  // Person

  person = {
    getById: (id: number): Promise<Person> => {
      return this.db<DbPerson>(Table.Person)
        .where({ id })
        .first()
        .then((res) => toCamelCase(res));
    },
    getByIds: (ids: number[]): Promise<Person[]> => {
      return this.db<DbPerson>(Table.Person)
        .whereIn('id', ids)
        .then((res) => res.map((a) => toCamelCase(a)));
    },
    getAll: (): Promise<Person[]> => {
      return this.db<DbPerson>(Table.Person).then((res) => res.map((a) => toCamelCase(a)));
    },
    // getAuthors
  };

  // Users

  user = {
    update: async (userId: string, data: Partial<User>): Promise<void> => {
      const dbData = toSnakeCase<Partial<DbUser>>(data);
      return this.db<DbUser>(Table.User).where({ id: userId }).update(dbData);
    },
    getById: async (id: string): Promise<User | undefined> => {
      const result = await this.db<DbUser>(Table.User).where({ id }).first();
      return result ? toCamelCase<User>(result) : result;
    },
    add: async (user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> => {
      const dbItem = toSnakeCase<DbUser>(user);

      await this.db<DbUser>(Table.User)
        .insert({
          ...dbItem,
          created_at: new Date().valueOf(),
          updated_at: new Date().valueOf(),
        })
        .onConflict()
        .ignore();

      const result = await this.user.getById(user.id);

      return toCamelCase<User>(result);
    },
  };
}

function toSnakeCase<TResult>(source: any): TResult {
  const result = Object.entries(source).reduce((acc, [key, val]) => {
    acc[_.snakeCase(key)] = val;
    return acc;
  }, {} as any);

  return result as TResult;
}

function toCamelCase<TResult>(source: any): TResult {
  const result = Object.entries(source).reduce((acc, [key, val]) => {
    acc[_.camelCase(key)] = val;
    return acc;
  }, {} as any);

  return result as TResult;
}
