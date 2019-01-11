import Link from 'next/link';
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('../components/Map/Map'), {
  ssr: false
})

export default () => (
  <div>
    <nav style={{display:'flex',justifyContent:'space-between'}}>
      <div className='nav-left' style={{display:'flex'}}>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <div>></div>
        <Link href='/map'>
          Map
        </Link>
      </div>
      <div className='nav-right'>
        <a>Sign Out</a>
      </div>
    </nav>
    
    <div className='map-header' style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
      <div className='friend-checkbox' style={{display:'flex'}}>
        <input type="checkbox" />
        <div>Show Friends' Travels</div>
      </div>
    <h1>My Travels &or;</h1>
    <input type='text' placeholder='search'/>
    </div>
    
    <div style={{height:'400px',width:'100%',margin:'0'}}>
      <DynamicMap />
    </div>
  </div>
)
