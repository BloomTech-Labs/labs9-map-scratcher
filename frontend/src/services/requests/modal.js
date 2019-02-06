import gql from 'graphql-tag'

// client queries
export const QUERY_CLIENT_MODAL = gql`
  {
    viewingFriend @client,
    friendId @client,
    viewBorders @client,
    countryId @client
  }
`
export const QUERY_SCRATCHING_MODAL = gql`
  query {
    scratchingComplete @client
  }
`

// client mutations
export const MUTATION_SCRATCHING_MODAL = gql`
  mutation ScratchingReset {
    scratchingReset @client
  }
`
export const MUTATION_CLOSEMODAL_MODAL = gql`
  mutation CloseModal {
    closeModal @client
  }
`

// yoga queries
export const QUERY_COUNTRYID_MODAL = gql`
  query CountryById($id: ID!) {
    countryById(id: $id) {
      name
    }
  }
`
export const QUERY_VISIT_MODAL = gql`
  query Visit($id: ID!) {
    visit(id: $id) {
      level
    }
  }
`
export const QUERY_USERVISITS_MODAL = gql`
    query User($id: ID!) {
    user(id: $id) {
      id
      scratchingAutomated 
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
export const QUERY_FRIENDSVISITS_MODAL = gql`
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

// yoga mutations
export const MUTATION_CREATEVISIT_MODAL = gql`
  mutation CreateVisit(
      $userId: ID!
      $countryId: ID!,
      $level: Int,
      $note: String)
    {
    createVisit(
      userId: $userId,
      countryId: $countryId,
      level: $level,
      note: $note)
    {
      id,
      level,
      note,
      country {
        id
        code
        name
      }
      user {
        id
        name
        scratchingAutomated
      }
    }
  }
`
export const MUTATION_UPDATEVISIT_MODAL = gql`
  mutation UpdateVisit(
      $id: ID!
      $level: Int,
      $note: String)
    {
    updateVisit(
      id: $id,
      level: $level,
      note: $note)
    { id
      level
      note
      country {
        id
        name
        code
      }
      user {
        id
        name
        scratchingAutomated
      }
    }
  }
`
export const MUTATION_DELETEVISIT_MODAL = gql`
  mutation DeleteVisit(
      $id: ID!)
    {
    deleteVisit(id: $id) {
      id
    }
  }
`
