import { gql } from 'mercurius-codegen';

export const Person = gql`
  type Person {
    id: Int!
    name: String!
    email: String
    webUrl: String
    apps: [App!]!
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
