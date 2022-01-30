import { gql } from 'mercurius-codegen';

export const Query = gql`
  type Query {
    user: User!
    person(id: Int!): Person
    people: [Person!]!
    category(id: Int!): Category
    categories: [Category!]!
    app(id: Int!): App
  }
`;
