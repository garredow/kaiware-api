import { gql } from 'mercurius-codegen';

export const Release = gql`
  type Release {
    id: Int!
    appId: Int!
    version: String!
    description: String
    downloadUrl: String!
    webUrl: String
    app: App!
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
