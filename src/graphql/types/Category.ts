import { gql } from 'mercurius-codegen';

export const Category = gql`
  type Category {
    id: Int!
    name: String!
    description: String
    apps: [App!]!
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
