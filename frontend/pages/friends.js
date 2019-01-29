import FriendsCard from '../components/Friends/friendsCard.js'
import { QUERY_CLIENT_PROFILE, QUERY_FRIENDS_PROFILE } from '../services/requests/profile.js'
import { Query } from 'react-apollo';
import { withRouter } from 'next/router'

const Friends = withRouter((props) => (
    <Query query={QUERY_CLIENT_PROFILE}>
    {({ loading: loadingUserId, data: { userId } }) => {
        if(loadingUserId) {
            return <div>Loading...</div>
        }
        return (
            <Query query={QUERY_FRIENDS_PROFILE} variables={{id: userId}}> 
            {({ loading, data: friends }) => {
                if(loading) {
                    return <div>loading...</div>
                }
                return (
                        <div>
                            <FriendsCard id={props.router.query.id} currentUserId={userId} friendsData={friends.friends} />
                        </div>
                )
            }}
            </Query>
        )
    }}
    </Query>
))

export default Friends