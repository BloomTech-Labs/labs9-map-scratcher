import gql from 'graphql-tag'
// naming scheme - query/mutation_target_page/component

// >>>PROFILE PAGE
// client requests
export const QUERY_CLIENT_PROFILE = gql`
  {
    userId @client
  }
`
// yoga requests
export const QUERY_USER_PROFILE = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      nickname
      email
      scratchingAutomated
      isPrivate
    }
  }
`
export const QUERY_USERS_PROFILE = gql`
  {
    users {
      id
      name
    }
  }
`
export const MUTATION_UPDATEUSER_PROFILE = gql`
  mutation UpdateUser(
      $id: ID!
      $name: String, 
      $nickname: String, 
      $email: String,
      $scratchingAutomated: Boolean,
      $isPrivate: Boolean)
    {
    updateUser(
      name: $name, 
      nickname: $nickname, 
      email: $email,
      scratchingAutomated: $scratchingAutomated,
      isPrivate: $isPrivate) 
    {
      name,
      nickname,
      email,
      scratchingAutomated,
      isPrivate
    }
  }
`
export const MUTATION_ADDFRIEND_PROFILE = gql`
  mutation AddFriend(
      $userId: ID!
      $friendId: ID!,
    {
    addFriend(
      userId: $userId,
      friendId: $friendId,
      ) 
    {
     userId,
     friendId
    }
  }
`
export const MUTATION_DELETEFRIEND_PROFILE = gql`
  mutation DeleteFriend(
      $userId: ID!
      $friendId: ID!,
    {
    deleteFriend(
      userId: $userId,
      friendId: $friendId,
      ) 
    {
     userId,
     friendId
    }
  }
`

// >>>TRAVELS PAGE
// client requests
export const QUERY_CLIENT_TRAVELS = gql`
  {
    userId @client,
    viewingFriend @client,
    friendId @client
  }
`

// yoga requests
export const QUERY_USERVISITS_TRAVELS = gql`
    query User($id: ID!) {
    user(id: $id) {
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

// >>>MAP HEADER (props: userId)
// client requests
// unfinished mutation to toggle viewingFriend
// export const MUTATION_VIEWINGFRIEND_TRAVELS = gql`
//   mutation ViewingFriend()
//   {
//     viewingFriend() @client
//   }
// `

// need mutation to update friendId

// yoga requests
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

// >>>MAP (props: userId, viewingFriend, friendId, visitsFriends, visitsUser)
// no client requests 
// no yoga requests

// >>>COUNTRY MODAL (props: userId, viewingFriend, friendId, countryName)
// no client requests

// yoga requests
export const QUERY_COUNTRY_MODAL = gql`
  query Country($name: String!) {
    country(name: $name) {
      id
      name
      code
    }
  }
`

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
      level,
      note
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
    {
      level,
      note
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

// UNASSIGNED QUERIES & MUTATIONS - DO NOT DELETE


// export const CREATEUSER_MUTATION = gql`
//   mutation CreateUser(
//       $twitterHandle: String, 
//       $name: String, 
//       $nickname: String,
//       $email: String)
//     {
//     createUser(
//       twitterHandle: $twitterHandle,
//       name: $name, 
//       nickname: $nickname, 
//       email: $email) 
//     {
//       name
//     }
//   }
// `

// export const DELETEUSER_MUTATION = gql`
//   mutation DeleteUser(
//       $id: ID!)
//     {
//     deleteUser(
//       id: $id, 
//     ) 
//     {
//       id
//     }
//   }
// `

