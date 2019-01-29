import FriendsCard from '../components/Friends/friendsCard.js'
import {withRouter} from 'next/router'

const Friends = withRouter((props) => (
    <div>
       <FriendsCard id={props.router.query.id} />
    </div>
))

export default Friends