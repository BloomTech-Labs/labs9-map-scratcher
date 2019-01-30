import gql from 'graphql-tag'

// client queries
export const QUERY_CLIENT_PROFILE = gql`
  {
    userId @client
  }
`
export const QUERY_FRIEND_PROFILE = gql`
  {
    friendId @client
  }
`

// client mutations
export const MUTATION_FRIEND_PROFILE = gql`
  mutation SetFriendId($id: ID!) {
    setFriendId(id: $id) @client
  }
`
export const MUTATION_VIEWFRIEND_PROFILE = gql`
  mutation($id: ID!) {
    viewFriend(id: $id) @client
  }
`

// yoga queries
export const QUERY_USER_PROFILE = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      nickname
      email
      scratchingAutomated
      isPrivate
      bio
    }
  }
`
export const QUERY_FRIENDS_PROFILE = gql`
  query User($id: ID!) {
    friends(id: $id) {
      id
      name
    }
  }
`
export const QUERY_USERS_PROFILE = gql`
  {
    users {
      id
      name
      isPrivate
    }
  }
`

// yoga mutations
export const MUTATION_UPDATEUSER_PROFILE = gql`
  mutation UpdateUser(
      $id: ID!
      $name: String,
      $nickname: String,
      $email: String,
      $scratchingAutomated: Boolean,
      $isPrivate: Boolean,
      $bio: String)
    {
    updateUser(
      id: $id,
      name: $name,
      nickname: $nickname,
      email: $email,
      scratchingAutomated: $scratchingAutomated,
      isPrivate: $isPrivate,
      bio: $bio)
    {
      name,
      nickname,
      email,
      scratchingAutomated,
      isPrivate,
      bio
    }
  }
`
export const MUTATION_ADDFRIEND_PROFILE = gql`
  mutation AddFriend(
      $userId: ID!
      $friendId: ID!)
    {
    addFriend(
      userId: $userId,
      friendId: $friendId,
      )
    { id }
  }
`
export const MUTATION_DELETEFRIEND_PROFILE = gql`
  mutation DeleteFriend(
      $userId: ID!
      $friendId: ID!)
    {
    deleteFriend(
      userId: $userId,
      friendId: $friendId,
    )
    { id }
  }
`
export const MUTATION_DELETEUSER_PROFILE = gql`
  mutation DeleteUser($id: ID!)
  {
    deleteUser(id: $id)
    { id }
  }
`
