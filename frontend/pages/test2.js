

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import Link from 'next/link'
import { Fragment } from 'react'
import { Query } from 'react-apollo'
import {

  QUERY_ME_PROFILE,

} from '../services/requests/tests'
import UserCard from '../components/Profile/UserCard'
import FriendsList from '../components/Profile/FriendsList'
import UsersDropdown from '../components/Profile/UsersDropdown'
import '../components/Profile/profile.less'

//-- React Implementation ------------------------
export default () => (
  <Fragment>
    <div className='profile_pageContainer'>

      <div className='profile_mainContainer'>

              {/* #region UserCard component */}
                <Query query={QUERY_ME_PROFILE}>
                {({ loading: loadingUser, error, data: {user} }) => {
                  if (loadingUser) {
                    return <div>Loading</div>
                  }
                  if (error) {
                    return ( <div>I fucked up</div>)
                  }
                  console.log(user)
                  return (
                    <UserCard user={user}/>
                  );
                }}
                </Query>
              {/* #endregion UserCard component */}

      </div>
    </div>
  </Fragment>
);
