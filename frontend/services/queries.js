import gql from 'graphql-tag'

export const USERS_QUERY = gql`
  {
    users {
      id
      name
      nickname
      email
    }
  }
`

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      nickname
      email
    }
  }
`

export const COUNTRIES_QUERY = gql`
  {
    countries {
      id
      name
      code
    }
  }
`

export const COUNTRY_QUERY = gql`
  query Country($id: ID!) {
    country(id: $id) {
      id
      name
      code
    }
  }
`

export const USERVISITS_QUERY = gql`
    query User($id: ID!) {
    user(id: $id) {
      visits {
        country {
          id
          name
          code
        }
        level
        note
      }
    }
  }
`

export const FRIENDS_QUERY = gql`
query User($id: ID!) {
  friends(id: $id) {
    id
    name
  }
}
`
export const FRIENDSVISITS_QUERY = gql`
query User($id: ID!) {
  friends(id: $id) {
    id
    name
    visits {
      country {
        id
        name
        code
      }
      level
      note
    }
  }
}
`

export const ISLOGGEDIN_QUERY = gql`
  {
    isLoggedIn @client 
  }
`
