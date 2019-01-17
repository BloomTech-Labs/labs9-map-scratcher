import dynamic from 'next/dynamic'
import { Dimmer, Loader } from 'semantic-ui-react'
import { USERVISITS_QUERY, FRIENDSVISITS_QUERY } from '../services/queries'

import MapIndex from '../components/MapHeader/MapIndex.js'
import Legend from '../components/MapLegend/Legend.js'

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
})

export default () => {
      <div>
        <MapIndex />
        <div>
          <Query query={FRIENDSVISITS_QUERY} variable={{id}}>
          {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
              const friendsVisitsData = data.user.friends; 
              return (
                  <div>
                      {friendsData.map(user => <div key={user.id}>{user.name} {user.email}</div>)}
                  </div>
              )
          }}
          </Query>
          <DynamicMap
            borderData={this.state.borderData}
          />
          <Legend />
        </div>
      </div>
    );
  }

  // Apollo Query handlers
  receivedFriendBorderData = (queryResponse) => {
    // Get data from response;
    const loading = queryResponse.loading;
    const error = queryResponse.error;
    const data = data;
    const friendsData = data;
    friendsData.sanityCheck = true;
    // Handle loading and error states
    if(loading) { return null}
    if(error) { return null}
    // Handle Receiving of Data
    return this.setState({
      borderData: friendsData
    });
  }
}
