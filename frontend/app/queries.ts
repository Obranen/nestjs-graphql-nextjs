import { graphql } from '@/lib/__generated__/gql'

export const GET_ALL_USERS = graphql(`
  query GetAllUsers {
    users {
      id
      name
      email
    }
  }
`)
