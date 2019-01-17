import dynamic from 'next/dynamic'
import { Dimmer, Loader } from 'semantic-ui-react'

import MapIndex from '../components/Map/mapPage/index.js'
import Legend from '../components/Map/mapPage/legend.js'

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  loading: () => (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ),
  ssr: false
})

export default () => (
  <div>
    <MapIndex />
    <div>
    <DynamicMap />
    <Legend />
    </div>
  </div>
)
