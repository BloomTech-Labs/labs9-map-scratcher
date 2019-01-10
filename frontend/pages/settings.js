import Link from 'next/link';

import Settings from '../components/Settings/settings.js'

export default () => (
  <div>
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
    <Settings />
  </div>
);