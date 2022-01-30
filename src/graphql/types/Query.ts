import { gql } from 'mercurius-codegen';

export const Query = gql`
  type Query {
    user: User!
    person(id: Int!): Person
    category(id: Int!): Category
    app(id: Int!): App
  }
`;
