import React from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { MUTATION_ADDFRIEND_PROFILE } from '../../services/requests/profile';

const AddFriendButton = ({ userId, friendId }) => {

        return (
            <Mutation mutation={MUTATION_ADDFRIEND_PROFILE}>
            {( addFriend, {data} ) => (
                <Button
                 positive
                 onClick={() => {
                     addFriend({ variables: { userId: userId, friendId: friendId } })
                 }}
                 >Add friend</Button>
            )}
            </Mutation>
        )
}

export default AddFriendButton;