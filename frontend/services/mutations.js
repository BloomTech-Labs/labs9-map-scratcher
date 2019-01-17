import gql from 'graphql-tag'

const CREATEUSER_MUTATION = gql`
    mutation CreateUser($name: String!, $nickname: String!, $email: String!){
        createUser(name: $name, nickname: $nickname, email: $email) {
            name
        }
    }
`

export default { CREATEUSER_MUTATION }