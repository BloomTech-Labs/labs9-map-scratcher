import Link from 'next/link'

import ProfileCard from '../components/ProfileComponents/userProfile.js'

export default () => (
  <div>
    <p>
      <Link href="/">
        <a>Home </a>
      </Link>
      >
      <Link href="/profile">
        <a> Profile</a>
      </Link>
    </p>
    <ProfileCard />
  </div>
)
