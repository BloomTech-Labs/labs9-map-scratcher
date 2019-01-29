import FriendsCard from '../components/Friends/friendsCard.js'
import { QUERY_CLIENT_PROFILE } from '../services/requests/profile.js'
import {withRouter} from 'next/router'
import { Query } from 'react-apollo';

const Friends = withRouter((props) => (
    <Query query={QUERY_CLIENT_PROFILE}>
    {({ loading: loadingUserId, data: { userId } }) => {
        if(loadingUserId) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <FriendsCard id={props.router.query.id} currentUserId={userId} />
            </div>
        )
    }}
    </Query>
))

export default Friends