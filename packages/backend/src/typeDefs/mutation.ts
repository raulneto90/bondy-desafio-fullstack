import gql from 'graphql-tag'

export default gql`
  type User {
    id: ID
    name: String
    email: String
    company: String
  }

  type Mutation {
    login(email: String!, password: String!): User
  }
`
