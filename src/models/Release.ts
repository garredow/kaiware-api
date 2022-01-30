export type Release = {
  id: number;
  appId: number;
  version: string;
  description?: string;
  downloadUrl: string;
  webUrl?: string;
  createdAt: number;
  updatedAt: number;
};
