import gql from 'graphql-tag'

// yoga queries
export const QUERY_USER_SCRATCHER = gql`
  query User($id: ID!) {
    user(id: $id) {
      scratchingAutomated
    }
  }
`
export const QUERY_COUNTRYID_SCRATCHER = gql`
  query CountryById($id: ID!) {
    countryById(id: $id) {
      code
    }
  }
`

// yoga mutations
export const MUTATION_COMPLETE_SCRATCHER = gql`
  mutation ScratchingComplete {
    scratchingComplete @client
  }
`