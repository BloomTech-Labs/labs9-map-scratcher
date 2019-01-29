import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { MUTATION_DELETEFRIEND_PROFILE } from '../../services/requests/profile';

const DeleteFriendButton = ({ userId, friendId }) => {

        return (
            <Mutation mutation={MUTATION_DELETEFRIEND_PROFILE} variables={{ userId: userId, friendId: friendId }}>
            {deleteFriend => (
                <Button
                 negative
                 onClick={deleteFriend}
                 >Delete friend</Button>
            )}
            </Mutation>
        )
}

export default DeleteFriendButton;