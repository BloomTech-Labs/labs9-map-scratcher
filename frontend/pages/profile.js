import Link from 'next/link'

import Profile from '../components/Profile/profile.js'

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
    <Profile />
  </div>
)
