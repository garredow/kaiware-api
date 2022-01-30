import { gql } from 'mercurius-codegen';

export const App = gql`
  type App {
    id: Int!
    name: String!
    description: String
    iconUrl: String
    screenshotUrls: [String!]!
    repoUrl: String
    license: String
    authors: [Person!]!
    maintainers: [Person!]!
    categories: [Category!]!
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
