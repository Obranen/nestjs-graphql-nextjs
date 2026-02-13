// import gql from 'graphql-tag'
import { gql } from 'graphql-tag'

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      email
    }
  }
`
