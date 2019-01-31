import gql from 'graphql-tag'

// client queries
export const QUERY_CLIENT_TRAVELS = gql`
  {
    userId @client,
    viewingFriend @client,
    friendId @client,
    viewBorders @client
  }
`
export const QUERY_MODAL_TRAVELS = gql`
  query {
    modalOpen @client
  }
`

// client mutations
export const MUTATION_BORDERS_TRAVELS = gql`
mutation toggleBorders {
  toggleBorders @client
}
`
export const MUTATION_OPENMODAL_TRAVELS = gql`
  mutation OpenModal($id: ID!) {
    openModal(id: $id) @client
  }
`

// yoga queries
export const QUERY_COUNTRY_TRAVELS = gql`
  query CountryByName($name: String!) {
    countryByName(name: $name) {
      id
      name
      code
    }
  }
`
export const QUERY_ME_TRAVELS = gql`
    query Me {
    me {
      id
    }
  }
`

export const QUERY_FRIENDSVISITS_TRAVELS = gql`
query User($id: ID!) {
  friends(id: $id) {
    id
    name
    visits {
      id
      level
      note
      country {
        id
        name
        code
      }
    }
  }
}
`
