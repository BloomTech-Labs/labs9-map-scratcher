import Link from 'next/link';

// import WorldMap from '../components/Map/Map';

// export default () => (
//   <div>
//     <h1>Map?</h1>
//     <div style={{height:'100vh'}}>
//       <WorldMap />
//     </div>
//     <p>
//       <Link href="/">
//         <a>Home</a>
//       </Link>
//     </p>
//   </div>
// );

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map/Map'), {
  ssr: false
})

export default () => (
  <div>
    <h1>Map?</h1>
    <div style={{height:'400px',width:'100%',margin:'0'}}>
      <DynamicComponentWithNoSSR />
    </div>
    <p>
          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
  </div>
)
