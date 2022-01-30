export type DbApp = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  screenshot_urls: string[];
  repo_url: string;
  license?: string;
  author_ids: number[];
  maintainer_ids: number[];
  category_ids: number[];
  created_at: number;
  updated_at: number;
};

export type DbCategory = {
  id: number;
  name: string;
  description?: string;
  created_at: number;
  updated_at: number;
};

export type DbPerson = {
  id: number;
  name: string;
  email?: string;
  web_url?: string;
  created_at: number;
  updated_at: number;
};

export type DbUser = {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  created_at: number;
  updated_at: number;
};

export type DbAppAuthorMap = {
  id: string;
  app_id: number;
  person_id: number;
  created_at: number;
  updated_at: number;
};

export type DbAppMaintainerMap = {
  id: string;
  app_id: number;
  person_id: number;
  created_at: number;
  updated_at: number;
};

export type DbAppCategoryMap = {
  id: string;
  app_id: number;
  category_id: number;
  created_at: number;
  updated_at: number;
};
