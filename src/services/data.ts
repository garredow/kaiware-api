import { Database } from '../database/db';
import { App, Category, Person, User } from '../models';

export class Data {
  db: Database;

  constructor(db?: Database) {
    this.db = db ?? new Database();
  }

  user = {
    getById: (id: string): Promise<User | undefined> => {
      return this.db.user.add({ id });
    },
  };

  category = {
    getById: (id: number): Promise<Category | undefined> => {
      return this.db.category.getById(id);
    },
    getByAppId: (appId: number): Promise<Category[]> => {
      return this.db.category.getByAppId(appId);
    },
  };

  app = {
    getById: (id: number): Promise<App | undefined> => {
      return this.db.app.getById(id);
    },

    getByCategoryId: (categoryId: number): Promise<App[]> => {
      return this.db.app.getByCategoryId(categoryId);
    },

    getByPersonId: (personId: number): Promise<App[]> => {
      return this.db.app.getByPersonId(personId);
    },
  };

  person = {
    getById: (id: number): Promise<Person | undefined> => {
      return this.db.person.getById(id);
    },

    getAuthorsByAppId: async (appId: number): Promise<Person[]> => {
      const personIds = await this.db.appAuthorMap
        .getAllByAppId(appId)
        .then((res) => res.map((a) => a.personId));

      return this.db.person.getByIds(personIds);
    },

    getMaintainersByAppId: async (appId: number): Promise<Person[]> => {
      const personIds = await this.db.appMaintainerMap
        .getAllByAppId(appId)
        .then((res) => res.map((a) => a.personId));
      return this.db.person.getByIds(personIds);
    },
  };
}
