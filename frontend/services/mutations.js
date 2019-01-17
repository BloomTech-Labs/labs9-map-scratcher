import gql from 'graphql-tag'

const CREATEUSER_MUTATION = gql`
  mutation CreateUser(
      $twitterHandle: String, 
      $name: String, 
      $nickname: String,
      $email: String)
    {
    createUser(
      twitterHandle: $twitterHandle,
      name: $name, 
      nickname: $nickname, 
      email: $email) 
    {
      name
    }
  }
`

const UPDATEUSER_MUTATION = gql`
  mutation UpdateUser(
      $id: ID!
      $name: String, 
      $nickname: String, 
      $email: String,
      $scratchingAutomated: Boolean,
      isPrivate: Boolean)
    {
    updateUser(
      name: $name, 
      nickname: $nickname, 
      email: $email,
      scratchingAutomated: $scratchingAutomated,
      isPrivate: $isPrivate) 
    {
      name
    }
  }
`

const DELETEUSER_MUTATION = gql`
  mutation DeleteUser(
      $id: ID!)
    {
    deleteUser(
      id: $id, 
    ) 
    {
      id
    }
  }
`

const CREATEVISIT_MUTATION = gql`
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
      note: $note
      ) 
    {
      level,
      note
    }
  }
`

const UPDATEVISIT_MUTATION = gql`
  mutation UpdateVisit(
      $id: ID!
      $level: Int,
      $note: String)
    {
    updateVisit(
      id: $id,
      level: $level,
      note: $note
      ) 
    {
      level,
      note
    }
  }
`
const DELETEVISIT_MUTATION = gql`
  mutation DeleteVisit(
      $id: ID!)
    {
    deleteVisit(
      id: $id, 
    ) 
    {
      id
    }
  }
`

const ADDFRIEND_MUTATION = gql`
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

const DELETEFRIEND_MUTATION = gql`
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

export default { 
  CREATEUSER_MUTATION, 
  UPDATEUSER_MUTATION,
  DELETEUSER_MUTATION, 
  CREATEVISIT_MUTATION,
  UPDATEVISIT_MUTATION,
  DELETEVISIT_MUTATION,
  ADDFRIEND_MUTATION,
  DELETEFRIEND_MUTATION 
}