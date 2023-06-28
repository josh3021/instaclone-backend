import gql from "graphql-tag";

export default gql`
  type Login {
    result: Boolean!
    token: String
    message: String
  }

  type Mutation {
    login(username: String!, password: String!): Login
  }
`;
