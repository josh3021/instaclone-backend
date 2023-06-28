import gql from "graphql-tag";

export default gql`
  type CreateAccountResult {
    result: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult!
  }
`;
