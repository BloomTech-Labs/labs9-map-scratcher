import Link from 'next/link';
import dynamic from 'next/dynamic'
import MapIndex from '../components/Map/mapPage/index.js'
import Legend from '../components/Map/mapPage/legend.js'

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
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
