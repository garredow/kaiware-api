export type App = {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  screenshotUrls: string[];
  repoUrl: string;
  license?: string;
  authorIds: number[];
  maintainerIds: number[];
  categoryIds: number[];
  createdAt: number;
  updatedAt: number;
};
