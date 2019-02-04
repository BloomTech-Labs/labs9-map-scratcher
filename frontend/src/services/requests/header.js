import gql from 'graphql-tag'

// client queries
// export const QUERY_CLIENT_HEADER = gql`
//   {
//     userId @client
//   }
// `
export const QUERY_VIEWFRIEND_HEADER = gql`
  {
    viewingFriend @client
  }
`
export const QUERY_VIEWBORDERS_HEADER = gql`
  {
    viewBorders @client
  }
`

// client mutations
export const MUTATION_VIEWFRIEND_HEADER = gql`
  mutation($id: ID!, $me: String) {
    viewFriend(id: $id, me: $me) @client
  }
`
export const MUTATION_OPENMODAL_HEADER = gql`
  mutation OpenModal($id: ID!) {
    openModal(id: $id) @client
  }
`
export const MUTATION_BORDERS_HEADER = gql`
mutation toggleBorders {
  toggleBorders @client
}
`

// yoga queries
export const QUERY_COUNTRIES_HEADER = gql`
  {
    countries {
      id
      name
      code
    }
  }
`
export const QUERY_FRIENDS_HEADER = gql`
  query User($id: ID!) {
    friends(id: $id) {
      id
      name
    }
  }
`

export const QUERY_MY_FRIENDS_HEADER = gql`
  query MyFriends {
    me {
      id
      friends {
        id
        name
      }
    }
  }
`
