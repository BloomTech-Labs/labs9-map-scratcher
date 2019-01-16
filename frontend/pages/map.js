import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Dimmer, Loader } from 'semantic-ui-react'

import MapIndex from '../components/Map/mapPage/index.js'
import UserDropDown from '../components/Map/mapPage/mapSettings.js'

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
    <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="nav-left" style={{ display: 'flex' }}>
        <Link href="/">
          <a>Home </a>
        </Link>
        <div>> </div>
        <Link href="/map">
          <a>Map</a>
        </Link>
      </div>
      <div className='nav-right'>
        <UserDropDown />
      </div>
    </nav>
    <MapIndex />
    <DynamicMap />
  </div>
)
